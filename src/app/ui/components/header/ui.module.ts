import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [MatToolbarModule],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [],
})
export class UIModule {}
