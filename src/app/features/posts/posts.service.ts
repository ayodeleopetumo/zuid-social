import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

import { Post } from './post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post: any) => ({
            title: post.title,
            content: post.content,
            id: post._id,
          }));
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; content: string; title: string }>(
      `http://localhost:3000/api/posts/${id}`
    );
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string; post: any }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((data) => {
        this.posts.push({
          title: data.post.title,
          content: data.post.content,
          id: data.post._id,
        });
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(updateData: { id: string; title: string; content: string }) {
    const post: Post = { ...updateData };
    this.http
      .put(`http://localhost:3000/api/posts/${post.id}`, post)
      .subscribe(() => {
        const updatedDatedPosts = [...this.posts];
        const oldPosts = this.posts.findIndex((p) => p.id === post.id);
        updatedDatedPosts[oldPosts] = { ...post };
        this.posts = updatedDatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        console.log('Post deleted!');
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
