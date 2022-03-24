import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

import { Post } from './post.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const API_URL = `${environment.apiBaseUrl}/posts/`;

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; count: number } | null>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; count: number }>(
        `${API_URL}${queryParams}`
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map(
              (post: {
                title: any;
                content: any;
                _id: any;
                image: any;
                creator: any;
              }) => ({
                title: post.title,
                content: post.content,
                id: post._id,
                image: post.image,
                creator: post.creator,
              })
            ),
            count: postData.count,
          };
        })
      )
      .subscribe({
        next: (data) => {
          this.posts = data.posts;
          this.postsUpdated.next({
            posts: [...this.posts],
            count: data.count,
          });
        },
        error: () => this.postsUpdated.next(null),
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      content: string;
      title: string;
      image: string;
      creator: string;
    }>(`${API_URL}${id}`);
  }

  addPost(post: Post) {
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('image', post.image!, post.title);
    this.http
      .post<{ message: string; post: Post }>(API_URL, postData)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.warn('e: ', err),
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
      postData = { ...updateData };
    }

    this.http.put(`${API_URL}${updateData.id}`, postData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(`${API_URL}${postId}`);
  }
}
