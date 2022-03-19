import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Component
import { CreatePostComponent } from './create-post/create-post.component';
import { ListPostComponent } from './list-post/list-post.component';

// Service
import { PostsService } from './posts.service';

import { AngularMaterialModule } from "../../angular-material.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  exports: [CreatePostComponent, ListPostComponent],
  declarations: [CreatePostComponent, ListPostComponent],
  providers: [PostsService],
})
export class PostsModule {}
