import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeTypeValidator } from "../mime-type.validator";

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
  form!: FormGroup;
  imagePreview!: string;

  private pageMode = Mode.CREATE;
  private postId: string | null = null;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initForm();
    this.isLoading = true;
    this.getPost();
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      content: new FormControl('', [Validators.required]),
      image: new FormControl(null, Validators.required, mimeTypeValidator)
    })
  }

  getPost() {
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
              image: ''
            };
            this.form.setValue({
              title: post.title,
              content: post.content,
              image: post.image
            })
          });
      } else {
        this.isLoading = false;
        this.pageMode = Mode.CREATE;
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) return;

    this.isLoading = true;
    if (this.pageMode === Mode.CREATE) {
      this.postsService.addPost(this.form.value);
    } else {
      this.postsService.updatePost({
        id: this.postId!,
        title: this.form.get('title')?.value,
        content: this.form.get('content')?.value,
        image: this.form.get('image')?.value
      });
    }
  }

  onImageSelected(evt: Event) {
    const file = (evt.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
}
