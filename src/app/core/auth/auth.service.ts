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

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post('http://localhost:3000/api/auth/signup', authData)
      .subscribe((res) => console.log(res));
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string, expiresIn: number }>('http://localhost:3000/api/auth/login', authData)
      .subscribe((response) => {
        if (response.token) {
          const expiresInDuration = response.expiresIn;
          this.setTokenTimer(expiresInDuration);
          this.saveToStorage(response.token, response.expiresIn);
          this.isAuthenticated = true;
          this.authTokenStatus.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logoutUser() {
    this.clearAuthData();
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
      this.setTokenTimer(expiresIn / 1000);
    }
  }

  private saveToStorage(token: string, expiration: number) {
    const now = new Date().getTime()
    const expirationDate = new Date(now + expiration * 1000).toISOString();

    localStorage.setItem('authToken', token);
    localStorage.setItem('expiresIn', expirationDate);
  }

  private clearAuthData() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiresIn');
  }

  private getAuthData() {
    const token = this.getAuthToken();
    const expirationDate = localStorage.getItem('expiresIn');

    if (!token || !expirationDate) return;

    return {
      token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setTokenTimer(expiresInDuration: number) {
    this.tokenTimer = setTimeout(() => this.logoutUser(), expiresInDuration * 1000);
  }
}
