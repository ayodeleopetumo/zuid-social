import { Component, OnInit } from '@angular/core';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-list-post',
  templateUrl: 'list-post.component.html',
  styleUrls: ['list-post.component.scss'],
})
export class ListPostComponent implements OnInit {
  isLoading = false;
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsService
      .getPostUpdateListener()
      .subscribe((posts) => {
        this.isLoading = false
        this.posts = posts
      });
  }

  onPostDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
}
