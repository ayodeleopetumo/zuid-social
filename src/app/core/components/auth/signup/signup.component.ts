import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})

export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe(status => {
      this.isLoading = false;
    })
  }

  onSignup(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password)
  }
}
