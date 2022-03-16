import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPostComponent } from "./features/posts/list-post/list-post.component";
import { CreatePostComponent } from "./features/posts/create-post/create-post.component";
import { LoginComponent } from "./core/auth/login/login.component";
import { SignupComponent } from "./core/auth/signup/signup.component";

const routes: Routes = [
  {
    path: '',
    component: ListPostComponent
  },
  {
    path: 'create',
    component: CreatePostComponent
  },
  {
    path: 'edit/:postId',
    component: CreatePostComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
