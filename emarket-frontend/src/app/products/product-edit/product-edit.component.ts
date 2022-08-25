import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { Tag } from 'src/app/tags/tag.model';
import { TagService } from 'src/app/tags/tag.service';
// import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id!: number;
  editMode = false;

  productForm!: FormGroup;

  categories!: Category[];

  tags!: Tag[];

  editorHtmlContent = '';

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    private tagService: TagService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
          // console.log(this.editMode);
          this.categories = this.categoryService.getCategories();
          this.tags = this.tagService.getTags();
        }
      );
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let gallery = new FormArray([]);
    let productUrl = '';
    let description = '';
    let price = 0;
    let oldPrice = 0;
    let currency = '';
    let quantity = 0;
    let categories = new FormArray([]);
    let tags = new FormArray([]);
    let rated = 0;
    let created = '';
    let modified = '';
    let status = '';

    if (this.editMode) {
      let product = this.productService.getProduct(this.id);
      name = product.name;
      imagePath = product.imagePath;
      if (product['gallery']) {
        for (let photoUrl of product.gallery) {
          gallery.push(
            new FormControl(photoUrl, Validators.required)
          );
        }
      }

      productUrl = product.productUrl;
      description = product.description;
      this.editorHtmlContent = description;
      price = product.price;
      oldPrice = product.oldPrice;
      currency = product.currency;
      quantity = product.quantity;

      if (product['categories']) {
        for (let category of product.categories) {
          // category = category + ' - ' + this.getCategoryName(category);
          categories.push(
            // (<FormArray>this.productForm.get('content')).push(
            new FormGroup({

              'id': new FormControl(category.id, [
                Validators.required,
                // Validators.pattern(/^[1-9]+[0-9]*$/)
                Validators.pattern(/^[0-9]*$/)
              ]),
              'name': new FormControl(category.name, Validators.required),
              'parent_category_id': new FormControl(category.parent_category_id, [
                Validators.required,
                // Validators.pattern(/^[1-9]+[0-9]*$/)
                Validators.pattern(/^[0-9]*$/)
              ]),
              // 'id': new FormControl(category, [
              //   Validators.required,
              //   // Validators.pattern(/^[1-9]+[0-9]*$/)
              //   Validators.pattern(/^[0-9]*$/)
              // ]
              // )
            })
          );
        }
      }

      if (product['tags']) {
        for (let tag of product.tags) {
          tags.push(
            new FormGroup({
              'id': new FormControl(tag.id, [
                Validators.required,
                // Validators.pattern(/^[1-9]+[0-9]*$/)
                Validators.pattern(/^[0-9]*$/)
              ]),
              'name': new FormControl(tag.name, Validators.required),
            })
          );
        }
      }

      rated = product.rated;
      created = product.created;
      modified = product.modified;
      status = product.status;
    }

    this.productForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'gallery': gallery,
      'productUrl': new FormControl(productUrl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'price': new FormControl(price, Validators.required),
      'oldPrice': new FormControl(oldPrice, Validators.required),
      'currency': new FormControl(currency, Validators.required),
      'quantity': new FormControl(quantity, Validators.required),
      'categories': categories,
      'tags': tags,
      'rated': new FormControl(rated, Validators.required),
      'created': new FormControl(created, Validators.required),
      'modified': new FormControl(modified, Validators.required),
      'status': new FormControl(status, Validators.required),
    });
  }

  getFormCategoriesDataControls() {
    return (<FormArray>this.productForm.get('categories')).controls;
  }

  getFormTagsDataControls() {
    return (<FormArray>this.productForm.get('tags')).controls;
  }

  getFormGalleryDataControls() {
    return (<FormArray>this.productForm.get('gallery')).value;
  }

  selectedCategory!: Category;
  onAddCategory() {
    if (this.selectedCategory) {
      (<FormArray>this.productForm.get('categories')).push(
        new FormGroup({
          'id': new FormControl(this.selectedCategory.id, [
            Validators.required,
          ]),
          'name': new FormControl(this.selectedCategory.name, Validators.required),
          'parent_category_id': new FormControl(this.selectedCategory.parent_category_id, [
            Validators.required,
          ]),
        })
      );
    }
  }

  onCategoryChanged(selectedCategory: Category) {
    // console.log('onCategoryChanged')
    this.selectedCategory = selectedCategory;
    // console.log(value)
  }

  selectedTag!: Tag;
  onAddTag() {
    if (this.selectedTag) {
      (<FormArray>this.productForm.get('tags')).push(
        new FormGroup({
          'id': new FormControl(this.selectedTag.id, [
            Validators.required,
          ]),
          'name': new FormControl(this.selectedTag.name, Validators.required),
        })
      );
    }
  }

  onTagChanged(selectedTag: Tag) {
    // console.log('onCategoryChanged')
    this.selectedTag = selectedTag;
    // console.log(value)
  }

  onAddGallery() {
    (<FormArray>this.productForm.get('gallery')).push(
      // new FormGroup({
      // 'photoUrl': 
      new FormControl('', Validators.required)
      // })
    );
  }

  onSubmit() {
    // console.log(this.productForm);

    // const newProduct = new Product(
    //   this.productForm.value['name'], 
    //   this.productForm.value['imageURL'], 
    //   this.productForm.value['description'],
    //   this.productForm.value['content']);
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
      console.log((<FormArray>this.productForm.value));

    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }

  blured = false
  focused = false

  created(event: any) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    // console.log('editor-change', event)
    this.editorHtmlContent = event.editor.root.innerHTML;
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

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteCategory(index: number) {
    (<FormArray>this.productForm.get('categories')).removeAt(index);
  }

  onDeleteTag(index: number) {
    (<FormArray>this.productForm.get('tags')).removeAt(index);
  }

  onDeletePhotoUrl(index: number) {
    (<FormArray>this.productForm.get('gallery')).removeAt(index);
  }

  // getCategoryName(id: string) {
  //   return this.categoryService.getCategoryName(id);
  // }

}
