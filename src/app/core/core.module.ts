import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from "@angular/common";

import { throwIfAlreadyLoaded } from "./guards/module-import.gaurd";

import { LoginComponent } from "./auth/login/login.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatProgressSpinnerModule, MatCardModule, MatInputModule, MatButtonModule],
  exports: [LoginComponent],
  declarations: [LoginComponent],
  providers: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
