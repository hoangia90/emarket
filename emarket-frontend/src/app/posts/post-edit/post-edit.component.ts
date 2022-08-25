import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import 'quill-emoji/dist/quill-emoji.js';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { Tag } from 'src/app/tags/tag.model';
import { TagService } from 'src/app/tags/tag.service';
// import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  id!: number;
  editMode = false;

  postForm!: FormGroup;

  categories!: Category[];

  tags!: Tag[];

  editorHtmlContent = '';

  // gallery!: String[];

  constructor(private route: ActivatedRoute,
    private postService: PostService,
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
          console.log(this.editMode);
          this.categories = this.categoryService.getCategories();
          this.tags = this.tagService.getTags();
        }
      );
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let gallery = new FormArray([]);
    let url = '';
    let description = '';
    // let price = 0;
    // let oldPrice = 0;
    // let currency = '';
    // let quantity = 0;
    let categories = new FormArray([]);
    let tags = new FormArray([]);
    let rated = 0;
    let created = '';
    let modified = '';

    if (this.editMode) {
      let post = this.postService.getPost(this.id);
      name = post.name;
      imagePath = post.imagePath;
      if (post['gallery']) {
        for (let photoUrl of post.gallery) {
          gallery.push(
            new FormControl(photoUrl, Validators.required)
          );
        }
      }

      url = post.url;
      description = post.description;
      this.editorHtmlContent = description;
      // price = post.price;
      // oldPrice = post.oldPrice;
      // currency = post.currency;
      // quantity = post.quantity;

      if (post['categories']) {
        for (let category of post.categories) {
          // category = category + ' - ' + this.getCategoryName(category);
          categories.push(
            // (<FormArray>this.postForm.get('content')).push(
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

      if (post['tags']) {
        for (let tag of post.tags) {
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
      
      rated = post.rated;
      created = post.created;
      modified = post.modified;
    }

    this.postForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'gallery': gallery,
      'url': new FormControl(url, Validators.required),
      'description': new FormControl(description, Validators.required),
      // 'price': new FormControl(price, Validators.required),
      // 'oldPrice': new FormControl(oldPrice, Validators.required),
      // 'currency': new FormControl(currency, Validators.required),
      // 'quantity': new FormControl(quantity, Validators.required),
      'categories': categories,
      'tags': tags,
      'rated': new FormControl(rated, Validators.required),
      'created': new FormControl(created, Validators.required),
      'modified': new FormControl(modified, Validators.required),
    });
  }

  getFormCategoriesDataControls() {
    return (<FormArray>this.postForm.get('categories')).controls;
  }

  getFormTagsDataControls() {
    return (<FormArray>this.postForm.get('tags')).controls;
  }

  getFormGalleryDataControls() {
    return (<FormArray>this.postForm.get('gallery')).value;
  }

  selectedCategory!: Category;
  onAddCategory() {
    if (this.selectedCategory) {
      (<FormArray>this.postForm.get('categories')).push(
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
      (<FormArray>this.postForm.get('tags')).push(
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
    (<FormArray>this.postForm.get('gallery')).push(
      // new FormGroup({
      // 'photoUrl': 
      new FormControl('', Validators.required)
      // })
    );
  }

  onSubmit() {
    // console.log(this.postForm);

    // const newPost = new Post(
    //   this.postForm.value['name'], 
    //   this.postForm.value['imageURL'], 
    //   this.postForm.value['description'],
    //   this.postForm.value['content']);
    if (this.editMode) {
      this.postService.updatePost(this.id, this.postForm.value);
      console.log((<FormArray>this.postForm.value));

    } else {
      this.postService.addPost(this.postForm.value);
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
    this.editorHtmlContent = event.editor.root.innerHTML;
    // console.log('here!!!!!!' ,this.editorHtmlContent);
    // console.log('editor-change', event)
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
    (<FormArray>this.postForm.get('categories')).removeAt(index);
  }

  onDeleteTag(index: number) {
    (<FormArray>this.postForm.get('tags')).removeAt(index);
  }

  onDeletePhotoUrl(index: number) {
    (<FormArray>this.postForm.get('gallery')).removeAt(index);
  }

  // getCategoryName(id: string) {
  //   return this.categoryService.getCategoryName(id);
  // }

}