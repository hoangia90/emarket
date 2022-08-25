import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Post } from "./post.model";
import { PostService } from "./post.service";

@Injectable({ providedIn: 'root' })
export class PostsResolverService implements Resolve<Post[]>{
    constructor(private dataStorageService: DataStorageService, private postService: PostService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const posts = this.postService.getPosts();
        if (posts.length === 0) {
            return this.dataStorageService.fetchPosts();
            // return this.dataStorageService.fetchProducts();
        } else {
            return posts;
        }
    }
}