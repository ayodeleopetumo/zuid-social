import { Component, OnInit } from '@angular/core';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "../../../core/auth/auth.service";

@Component({
  selector: 'app-list-post',
  templateUrl: 'list-post.component.html',
  styleUrls: ['list-post.component.scss'],
})
export class ListPostComponent implements OnInit {
  isLoading = false;
  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 1;
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10];

  isUserAuthenticated = false;

  constructor(private postsService: PostsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsService
      .getPostUpdateListener()
      .subscribe((data: {posts: Post[], count: number}) => {
        this.isLoading = false;
        this.totalPosts = data.count;
        this.posts = data.posts;
      });
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.authService.getAuthStatus().subscribe(status => this.isUserAuthenticated = status);
  }

  onPostDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
