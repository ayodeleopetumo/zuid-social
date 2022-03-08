import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';



// Component
import { CreatePostComponent } from './create-post/create-post.component';
import { ListPostComponent } from './list-post/list-post.component';

@NgModule({
  imports: [MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatExpansionModule],
  exports: [CreatePostComponent, ListPostComponent],
  declarations: [CreatePostComponent, ListPostComponent],
  providers: [],
})
export class PostsModule { }
