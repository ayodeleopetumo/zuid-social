import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPostComponent } from './features/posts/list-post/list-post.component';
import { CreatePostComponent } from './features/posts/create-post/create-post.component';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListPostComponent,
  },
  {
    path: 'create',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:postId',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
