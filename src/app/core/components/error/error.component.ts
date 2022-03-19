import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'error-component',
  templateUrl: 'error.component.html'
})

export class ErrorComponent implements OnInit {
  message = 'An unknown error occurred!';

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit() {}
}
