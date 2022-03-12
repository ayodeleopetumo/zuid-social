import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components
import { HeaderComponent } from './header.component';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  imports: [MatToolbarModule, RouterModule, MatButtonModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [],
})
export class UIModule {}
