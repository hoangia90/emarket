import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  // @Input() 
  post!: Post;
  // @Input() 
  id!: number;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // console.log(this.id);
        // console.log('Location >> ', this.id);
        
        this.post = this.postService.getPost(this.id);

      }
    );
  }

  // onAddToShoppingList() {
  //   this.postService.addCategoriesToShoppingList(this.post.categories);
  // }

  // onAddToShoppingCart() {
  //   this.postService.addServideToCart(this.post);
  //   this.router.navigate(['/shopping-list'], {relativeTo:this.route});
  // }
  
  onEditPost() {
    this.router.navigate(['edit'], {relativeTo:this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.route});
  }

  onDeletePost() {
    this.postService.deletePost(this.id);
    this.router.navigate(['/blog']);
  }

  onDeleteService() {
    this.postService.deletePost(this.id);
    this.router.navigate(['/blog']);
  }

}
