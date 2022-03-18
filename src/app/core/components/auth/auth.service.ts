import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private authTokenStatus = new Subject<boolean>();
  private tokenTimer: any;
  private userId: any;

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post('http://localhost:3000/api/auth/signup', authData)
      .subscribe({
        next: res => this.router.navigate(['/']),
        error: error => this.authTokenStatus.next(false)
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string, expiresIn: number, userId: string }>('http://localhost:3000/api/auth/login', authData)
      .subscribe({
        next: (response) => {
          if (response.token) {
            const expiresInDuration = response.expiresIn;
            this.setTokenTimer(expiresInDuration);
            this.saveToStorage(response.token, response.expiresIn, response.userId);
            this.isAuthenticated = true;
            this.authTokenStatus.next(true);
            this.userId = response.userId
            this.router.navigate(['/']);
          }
        },
        error: () => this.authTokenStatus.next(false)
      });
  }

  logoutUser() {
    this.clearAuthData();
    this.userId = null;
    this.isAuthenticated = false;
    this.authTokenStatus.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  getAuthStatus() {
    return this.authTokenStatus.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  checkAuthUser() {
    const authInfo = this.getAuthData();

    if (!authInfo) return;

    const now = new Date();
    const expiresIn = authInfo!.expirationDate?.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.isAuthenticated = true;
      this.authTokenStatus.next(true);
      this.userId  = authInfo.userId;
      this.setTokenTimer(expiresIn / 1000);
    }
  }

  getUserId() {
    return this.userId;
  }

  private saveToStorage(token: string, expiration: number, userId: string) {
    const now = new Date().getTime()
    const expirationDate = new Date(now + expiration * 1000).toISOString();

    localStorage.setItem('authToken', token);
    localStorage.setItem('expiresIn', expirationDate);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = this.getAuthToken();
    const expirationDate = localStorage.getItem('expiresIn');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) return;

    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    }
  }

  private setTokenTimer(expiresInDuration: number) {
    this.tokenTimer = setTimeout(() => this.logoutUser(), expiresInDuration * 1000);
  }
}
