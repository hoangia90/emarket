// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../post.model';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()
  post!: Post;
  @Input()
  index!: number;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
  }

  onEditPost() {
    this.router.navigate([this.index, 'edit'], { relativeTo: this.route });
  }

  onDeletePost() {
    this.postService.deletePost(this.index);
    this.router.navigate(['/blog']);
  }

  // onDeleteProduct() {
  //   this.productService.deleteProduct(this.id);
  //   this.router.navigate(['/products']);
  // }
}
