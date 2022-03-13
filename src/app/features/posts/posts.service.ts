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
          return postData.posts.map((post: { title: any; content: any; _id: any; image: any; }) => ({
            title: post.title,
            content: post.content,
            id: post._id,
            image: post.image
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
    return this.http.get<{ _id: string; content: string; title: string, image: string }>(
      `http://localhost:3000/api/posts/${id}`
    );
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', post.image!, post.title);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((data) => {
        this.posts.push(data.post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(updateData: Post) {
    let postData: Post | FormData;
    if (typeof updateData.image === 'object') {
      postData = new FormData();
      postData.append('id', updateData.id);
      postData.append('title', updateData.title);
      postData.append('content', updateData.content);
      postData.append('image', updateData.image, updateData.title);
    } else {
      postData = {...updateData}
    }

    this.http
      .put(`http://localhost:3000/api/posts/${updateData.id}`, postData)
      .subscribe(() => {
        const updatedDatedPosts = [...this.posts];
        const oldPosts = this.posts.findIndex((p) => p.id === updateData.id);
        updatedDatedPosts[oldPosts] = { ...updateData /*, image: response.image */};
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
