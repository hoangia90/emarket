import { ChangeDetectorRef, Component, ElementRef, NgModule, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription!: Subscription;

  searchText: any;

  filteredList: Category[] = [];
  hardware: Category[] = [];
  software: Category[] = [];

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.productService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    )
    this.products = this.productService.getProducts()

    // this.categoryData = this.categoryService.getCategories();
    this.filteredList = this.categoryService.getFullTreeFromRoot();
    this.hardware = this.categoryService.buildCategoryTreeFromSpecificParent('0000');
    this.software = this.categoryService.buildCategoryTreeFromSpecificParent('0001');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // filterByCategory(categoryId: string) {
  //   this.filteredList = this.categoryData.filter(cat => cat.parent_category_id == categoryId);
  // }

  onClickCategory(categoryId: string) {
    this.searchText = categoryId;
  }

}
