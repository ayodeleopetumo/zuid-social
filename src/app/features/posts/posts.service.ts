import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string; posts: Post[]}>('http://localhost:3000/api/posts').subscribe((data) => {
      this.posts = data.posts;
      this.postsUpdated.next([...this.posts])
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    const payload = {...post, id: null};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', payload).subscribe((data) => {
      console.log(data);
      this.posts.push(payload);
      this.postsUpdated.next([...this.posts]);
    })
  }
}
