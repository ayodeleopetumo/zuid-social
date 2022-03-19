import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

// Components
import { HeaderComponent } from './components/header/header.component';
import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
    imports: [RouterModule, CommonModule, AngularMaterialModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [],
})
export class UIModule {}
