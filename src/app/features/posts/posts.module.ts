import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


// Component
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  imports: [MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  exports: [CreatePostComponent],
  declarations: [CreatePostComponent],
  providers: [],
})
export class PostsModule { }
