import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Category } from "./category.model";

@Injectable()
export class CategoryService {
    isItemClicked = new EventEmitter<boolean>();;
    categoriesChanged = new Subject<Category[]>();

    private categories: Category[] = [
        // Product Category
        new Category(
            '00',
            'Computer',
            'null'
        ),
        new Category(
            '0000',
            'Hardware',
            '00'
        ),
        new Category(
            '0001',
            'Software',
            '00'
        ),
        new Category(
            '000100',
            'Cyber Security',
            '0001'
        ),
        new Category(
            '000000',
            'Hardware Security Acceleration',
            '0000'
        ),
        //Blog Category
    ];

    getItemCategory(id: string) {
        // return this.products.slice()[index];
        let result!: Category;
        for (let index = 0; index < this.categories.length; index++) {
            const element = this.categories[index];
            if (element.id == id) {
                result = element;
            }
        }
        return result;
    }

    getItemCategories(ids: string[]) {
        // return this.products.slice()[index];
        let result: Category[] = [];
        for (let index = 0; index < ids.length; index++) {
            const element = ids[index];
            result.push(this.getItemCategory(element));
        }
        return result;
    }

    getCategoryName(id: string) {
        return this.getItemCategory(id).name;
    }

    getCategories() {
        return this.categories;
    }

    build_category_map(categories: Category[], root: string) {
        let filteredList: Category[] = [];
        let temp = categories.filter(children => children.parent_category_id === root);
        while (temp.length > 0) {
            let cat = temp.pop();
            console.log(cat);
            if (cat) {
                let catLengthName = cat.name.replace(/./g,
                    '-');
                filteredList.push(cat);
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
        return filteredList;
    }

    getFullTreeFromRoot() {
        return this.buildCategoryTreeFromParent(this.categories, "null");
    }

    buildCategoryTreeFromSpecificParent(root: string) {
        return this.buildCategoryTreeFromParent(this.categories, root);
    }

    buildCategoryTreeFromParent(categories: Category[], root: string) {
        let filteredList: Category[] = [];
        let temp = categories.filter(parent => parent.parent_category_id === root)
            .map(c => <{ id: string, name: string, parent_category_id: string, level: number, sub: any[] }>
                {
                    id: c.id,
                    name: c.name = c.name,
                    level: 1,
                    parent_category_id: c.parent_category_id,
                    sub: []
                });
        while (temp.length > 0) {
            let cat = temp.pop();
            console.log(cat);
            if (cat) {
                let sub_level = cat.level + 1;
                let cat_children = categories.filter(children => children.parent_category_id === cat?.id)
                    .map(c => <{ id: string, name: string, parent_category_id: string, level: number, sub: any[] }>
                        {
                            id: c.id,
                            name: c.name = c.name,
                            parent_category_id: c.parent_category_id,
                            level: sub_level,
                            sub: []
                        });

                for (let index = 0; index < cat_children.length; index++) {
                    const element = cat_children[index];
                    temp.push(element);
                    cat.sub.push(element);
                }

                filteredList.push(cat);
            }
        }
        console.log(filteredList);

        return filteredList;
    }

    filterByCategory(categoryId: string) {
        return this.categories.filter(cat => cat.parent_category_id == categoryId);
    }
}