import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe(status => {
      this.isLoading = false;
    })
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    this.authService.loginUser(form.value.email, form.value.password);
  }
}
