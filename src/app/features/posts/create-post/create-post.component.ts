import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['create-post.component.scss']
})

export class CreatePostComponent implements OnInit {
  constructor(private postsService: PostsService) { }

  ngOnInit() { }

  onCreatePost(form: NgForm) {
    if (form.invalid) return;

    console.log(form.value);

    this.postsService.addPost(form.value);

    form.resetForm();
  }
}
