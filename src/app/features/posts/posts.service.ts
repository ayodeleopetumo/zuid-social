import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

import { Post } from './post.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[], count: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`
    this.http
      .get<{ message: string; posts: any, count: number }>(`http://localhost:3000/api/posts${queryParams}`)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post: { title: any; content: any; _id: any; image: any; creator: any }) => ({
              title: post.title,
              content: post.content,
              id: post._id,
              image: post.image,
              creator: post.creator
            })),
            count: postData.count
          }
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.posts = data.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          count: data.count
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; content: string; title: string, image: string, creator: string }>(
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
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(`http://localhost:3000/api/posts/${postId}`);
  }
}
