import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Tag } from "../tags/tag.model";

@Injectable()
export class TagService {
    isItemClicked = new EventEmitter<boolean>();;

    tagsChanged = new Subject<Tag[]>();

    // private posts: Post[] = [];

    private tags: Tag[] = [
        new Tag(
            0,
            'FHE',
        ),
        new Tag(
            1,
            'SEAL',
        ),
        new Tag(
            2,
            'PatternSearch',
        ),        
    ];
    
    // getTagName(id: string) {
    //     // return this.products.slice()[index];
    //     let result: string = '';
    //     for (let index = 0; index < this.tags.length; index++) {
    //         const element = this.tags[index];
    //         if (element.id == id) {
    //             result = element.name
    //         }
    //     }
    //     return result;
    // }

    getItemTag(id: number) {
        // return this.products.slice()[index];
        let result!: Tag;
        for (let index = 0; index < this.tags.length; index++) {
            const element = this.tags[index];
            if (element.id == id) {
                result = element;
            }
        }
        return result;
    }

    getItemTags(ids: number[]) {
        // return this.products.slice()[index];
        let result: Tag[] = [];
        for (let index = 0; index < ids.length; index++) {
            const element = ids[index];
            result.push(this.getItemTag(element));
        }
        return result;
    }

    getTagName(id: number) {
        return this.getItemTag(id).name;
    }

    getTags() {
        return this.tags;
    }

}