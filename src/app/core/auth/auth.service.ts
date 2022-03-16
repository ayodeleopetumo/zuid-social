import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData =  {email, password}
    this.http.post('http://localhost:3000/api/auth/signup', authData).subscribe((res) => console.log(res));
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post("http://localhost:3000/api/auth/login", authData).subscribe(response => {
      localStorage.setItem('authToken:', JSON.stringify(response));
    })
  }
}
