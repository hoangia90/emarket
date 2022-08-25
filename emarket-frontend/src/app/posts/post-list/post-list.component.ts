import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  subscription!: Subscription;
  searchText: any;

  filteredList: Category[] = [];
  categoryData: Category[] = [];
  public hoveredCategory: any;
  public hoveredsCategory: any;
  categories: any;

  constructor(private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.subscription = this.postService.postsChanged.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    )
    this.posts = this.postService.getPosts()

    this.categoryData = this.categoryService.getCategories();
    this.build_category_4(this.categoryData, 'null');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewPost() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  filterByCategory(categoryId: string) {
    this.filteredList = this.categoryData.filter(cat => cat.parent_category_id == categoryId);
  }

  build_category_3(categories: Category[], root: string) {
    let temp = categories.filter(children => children.parent_category_id === root);
    while (temp.length > 0) {
      let cat = temp.pop();
      console.log(cat);
      if (cat) {
        let catLengthName = cat.name.replace(/./g,
          '-');
        this.filteredList.push(cat);
        let cat_children = categories.filter(children => children.parent_category_id === cat?.id)
          .map(c => <{ id: string, name: string, parent_category_id: string }>
            {
              id: c.id,
              name: c.name = catLengthName + c.name,
              parent_category_id: c.parent_category_id
            });
        for (let index = 0; index < cat_children.length; index++) {
          const element = cat_children[index];
          temp.push(element);
        }
      }
    }
    return this.filteredList;
  }

  build_category_4(categories: Category[], root: string) {
    let temp = categories.filter(parent => parent.parent_category_id === root).map(c => <{ id: string, name: string, parent_category_id: string, sub: any[] }>
      {
        id: c.id,
        name: c.name = c.name,
        parent_category_id: c.parent_category_id,
        sub: []
      });
    while (temp.length > 0) {
      let cat = temp.pop();
      console.log(cat);
      if (cat) {

        let cat_children = categories.filter(children => children.parent_category_id === cat?.id)
          .map(c => <{ id: string, name: string, parent_category_id: string, sub: any[] }>
            {
              id: c.id,
              name: c.name = c.name,
              parent_category_id: c.parent_category_id,
              sub: []
            });

        for (let index = 0; index < cat_children.length; index++) {
          const element = cat_children[index];
          temp.push(element);
          cat.sub.push(element);
        }

        this.filteredList.push(cat);
      }
    }
    console.log(this.filteredList);

    return this.filteredList;
  }

  onClickCategory(categoryId: string) {
    this.searchText = categoryId;
  }

}
