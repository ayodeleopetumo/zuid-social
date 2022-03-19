import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { UIModule } from './ui/ui.module';

import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { CoreModule } from "./core/core.module";
import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    UIModule,
    FeaturesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
