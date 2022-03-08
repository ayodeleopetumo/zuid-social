import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['create-post.component.scss']
})

export class CreatePostComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  onCreatePost(form: NgForm) { 
    if (form.invalid) return;

    form.resetForm();
  }
}