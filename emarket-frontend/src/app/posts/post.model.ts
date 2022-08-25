import { Category } from "../categories/category.model";
import { Tag } from "../tags/tag.model";


export class Post {
    public id: number;
    public name!: string;
    public description!: string;
    public imagePath!: string;
    public gallery!: string[];
    // public price!: number;
    // public oldPrice!: number;
    // public currency!: string;
    // public quantity!: number;
    public url!: string;
    public specification!: string;
    public categories!: Category[];
    public tags!: Tag[];
    public rated!: number;
    public created!: string;
    public modified!: string;


    constructor(
        id: number, 
        name: string, 
        desc: string, 
        imagePath: string, 
        gallery: string[],
        // price: number, 
        // oldPrice: number,
        // currency: string,
        // quantity: number,
        url: string,
        categories: Category[], 
        tags: Tag[],
        rated: number,
        created: string,
        modified: string,
        ){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.gallery = gallery;
        // this.price = price;
        // this.oldPrice = oldPrice;
        // this.currency = currency;
        // this.quantity = quantity;
        this.url = url;
        this.categories = categories;
        this.tags = tags;
        this.rated = rated;
        this.created = created;
        this.modified = modified;
    }
}