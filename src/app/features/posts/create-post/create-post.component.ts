import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

enum Mode {
  CREATE,
  EDIT,
}

@Component({
  selector: 'app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  post!: Post;
  isLoading = false;
  private pageMode = Mode.CREATE;
  private postId: string | null = null;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      if (param.has('postId')) {
        this.pageMode = Mode.EDIT;
        this.postId = param.get('postId')!;
        this.postsService
          .getPost(this.postId)
          .subscribe((post) => {
            this.isLoading = false;
            this.post = {
              id: post._id,
              content: post.content,
              title: post.title,
            };
          });
      } else {
        this.isLoading = false;
        this.pageMode = Mode.CREATE;
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    if (this.pageMode === Mode.CREATE) {
      this.postsService.addPost(form.value);
    } else {
      this.postsService.updatePost({
        id: this.postId!,
        title: form.value.title,
        content: form.value.content,
      });
    }
  }
}
