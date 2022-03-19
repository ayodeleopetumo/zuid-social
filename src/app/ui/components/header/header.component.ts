import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../../../features/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  private destroyed$ = new Subject<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authService
      .getAuthStatus()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((status) => (this.isUserAuthenticated = status));
  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
