import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";


import { throwIfAlreadyLoaded } from "./guards/module-import.gaurd";

import { LoginComponent } from "./components/auth/login/login.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { ErrorInterceptor } from "./interceptors/error.inteceptor";
import { ErrorComponent } from "./components/error/error.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatProgressSpinnerModule, MatCardModule, MatInputModule, MatButtonModule, FormsModule, MatDialogModule],
  exports: [LoginComponent, SignupComponent, ErrorComponent],
  declarations: [LoginComponent, SignupComponent, ErrorComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
