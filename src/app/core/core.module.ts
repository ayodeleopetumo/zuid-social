import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { throwIfAlreadyLoaded } from './guards/module-import.gaurd';

import { LoginComponent } from '../features/auth/login/login.component';
import { SignupComponent } from '../features/auth/signup/signup.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.inteceptor';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  imports: [CommonModule, FormsModule, AngularMaterialModule],
  exports: [LoginComponent, SignupComponent, ErrorComponent],
  declarations: [LoginComponent, SignupComponent, ErrorComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
