import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../../core/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authService.getAuthStatus().subscribe(status => this.isUserAuthenticated = status);
  }

  onLogout() {
    this.authService.logoutUser();
  }
}
