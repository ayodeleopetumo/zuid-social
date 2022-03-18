import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPostComponent } from "./features/posts/list-post/list-post.component";
import { CreatePostComponent } from "./features/posts/create-post/create-post.component";
import { LoginComponent } from "./core/components/auth/login/login.component";
import { SignupComponent } from "./core/components/auth/signup/signup.component";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ListPostComponent
  },
  {
    path: 'create',
    component: CreatePostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit/:postId',
    component: CreatePostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
