import { Component, OnDestroy, OnInit } from '@angular/core';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-post',
  templateUrl: 'list-post.component.html',
  styleUrls: ['list-post.component.scss'],
})
export class ListPostComponent implements OnInit, OnDestroy {
  isLoading = false;
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 1;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userId!: string;
  isUserAuthenticated = false;
  destroyed$ = new Subject<void>();

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsService
      .getPostUpdateListener()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: { posts: Post[]; count: number } | null) => {
        this.isLoading = false;
        this.totalPosts = data?.count || 0;
        this.posts = data?.posts || [];
      });
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authService
      .getAuthStatus()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((status) => {
        this.isUserAuthenticated = status;
        this.userId = this.authService.getUserId();
      });
  }

  onPostDelete(postId: string) {
    this.isLoading = true;
    this.postsService
      .deletePost(postId)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
