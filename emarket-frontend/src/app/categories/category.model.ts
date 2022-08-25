export class Category {
    public id: string;
    public name!: string;
    public parent_category_id!: string;

    constructor(
        id: string, 
        name: string, 
        parent_category_id: string, 
        ){
        this.id = id;
        this.name = name;
        this.parent_category_id = parent_category_id;
    }
}