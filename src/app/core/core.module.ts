import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";


import { throwIfAlreadyLoaded } from "./guards/module-import.gaurd";

import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatProgressSpinnerModule, MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  exports: [LoginComponent, SignupComponent],
  declarations: [LoginComponent, SignupComponent],
  providers: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
