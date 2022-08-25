import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  subscription!: Subscription;

  currentRoute!: string;

  constructor(private router: Router, location: Location) { 
    router.events.subscribe(val => {
      this.currentRoute = location.path();
      // console.log('Location >>>> ', this.currentRoute);
    });
  }

  ngOnInit(): void {
  }

  blured = false
  focused = false

  created(event: any) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blured = false
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blured = true
  }

}
