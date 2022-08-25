import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Category } from "../categories/category.model";
import { Tag } from "../tags/tag.model";
import { Post } from "./post.model";

@Injectable()
export class PostService {
    isItemClicked = new EventEmitter<boolean>();;

    postsChanged = new Subject<Post[]>();

    private posts: Post[] = [
        new Post(
            0,
            'Blacklist-IP',
            '<p>Black list ip verification based on collaborative database</p>',
            'https://mcdn.wallpapersafari.com/medium/48/73/EH7LVN.png',
            [
                'https://mcdn.wallpapersafari.com/medium/48/73/EH7LVN.png',
                'https://cdn-chdai.nitrocdn.com/RQszEOEhikKKehixynYTvKdGZTDZOXsv/assets/static/optimized/rev-3b332ef/wp-content/uploads/2019/01/IP_ssl-1024x384.png'
            ],
            'http://localhost:4200/posts/0',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
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
            ],
            [
                new Tag(
                    0,
                    'FHE'
                ),
                new Tag(
                    1,
                    'SEAL'
                ),
            ],
            5,
            '01/01/2022',
            '01/01/2022'
        ),

        new Post(
            1,
            'Threshold Comparison',
            'Measuring the value against a threshold value',
            'https://www.wallpapertip.com/wmimgs/177-1772428_cold-temperature.jpg',
            [],
            'http://localhost:4200/posts/1',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
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
            ],
            [
                new Tag(
                    0,
                    'FHE'
                ),
                new Tag(
                    1,
                    'SEAL'
                ),
            ],
            5,
            '01/01/2022',
            '01/01/2022'
        ),

        new Post(
            2,
            'Driving License Validity Checker',
            'Checking existence of an encrypted value in encrypted data',
            'https://external-preview.redd.it/zJW5OeQV76GPRO0SiRyD5_qHfjshTfZAQHjTDIy-poY.jpg?auto=webp&s=c979bf4a5cd4bbb2db47471b0f8265cf5ceb2cd5',
            [],
            'http://localhost:4200/posts/2',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
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
            ],
            [
                new Tag(
                    0,
                    'FHE'
                ),
                new Tag(
                    1,
                    'SEAL'
                ),
            ],
            5,
            '01/01/2022',
            '01/01/2022'
        ),

        new Post(
            3,
            'Spam Email Checker',
            'Verification spam email',
            'https://www.wallpapertip.com/wmimgs/35-358709_email-wallpaper-hd.jpg',
            [],
            'http://localhost:4200/posts/3',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
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
            ],
            [
                new Tag(
                    0,
                    'FHE'
                ),
                new Tag(
                    1,
                    'SEAL'
                ),
            ],
            5,
            '01/01/2022',
            '01/01/2022'
        ),

        new Post(
            4,
            'Dummy Algorithm',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus, leo id pulvinar vestibulum, ligula nisl tincidunt magna, eu volutpat leo neque quis justo. Fusce semper ante id mi porta porta. Pellentesque nec pretium purus. Curabitur lobortis tempus consectetur. Nam ullamcorper gravida erat sed suscipit. Morbi quis porttitor nunc. Suspendisse lacinia a turpis vitae laoreet. Aliquam pellentesque scelerisque urna. Cras vulputate nisi sed elit commodo cursus. Aenean interdum, erat at convallis dictum, urna enim tincidunt nisi, vitae tempor nisi nisi a tellus. Aliquam volutpat dui eget gravida eleifend. Nullam pulvinar justo eget tellus commodo, eget molestie dui convallis. Curabitur at fermentum lorem. Maecenas porttitor sem ut enim efficitur bibendum et vel metus.',
            'https://www.wallpapertip.com/wmimgs/237-2372536_cybersecurity-wallpaper.jpg',
            [],
            'http://localhost:4200/posts/4',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
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
            ],
            [],
            5,
            '01/01/2022',
            '01/01/2022'
        ),

    ];

    addDummyPosts(n: number) {
        let postsLength = this.posts.length;
        for (let i = postsLength; i < postsLength + n; i++) {
            let p = new Post(
                i,
                'Dummy Algorithm',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus, leo id pulvinar vestibulum, ligula nisl tincidunt magna, eu volutpat leo neque quis justo. Fusce semper ante id mi porta porta. Pellentesque nec pretium purus. Curabitur lobortis tempus consectetur. Nam ullamcorper gravida erat sed suscipit. Morbi quis porttitor nunc. Suspendisse lacinia a turpis vitae laoreet. Aliquam pellentesque scelerisque urna. Cras vulputate nisi sed elit commodo cursus. Aenean interdum, erat at convallis dictum, urna enim tincidunt nisi, vitae tempor nisi nisi a tellus. Aliquam volutpat dui eget gravida eleifend. Nullam pulvinar justo eget tellus commodo, eget molestie dui convallis. Curabitur at fermentum lorem. Maecenas porttitor sem ut enim efficitur bibendum et vel metus.',
                'https://www.wallpapertip.com/wmimgs/237-2372536_cybersecurity-wallpaper.jpg',
                [],
                'http://localhost:4200/posts/' + i,
                [
                    new Category(
                        '00',
                        'Computer',
                        'null'
                    )
                ],
                [],
                5,
                '01/01/2022',
                '01/01/2022'
            );
            this.posts.push(p);
        }
    }

    constructor() {
        this.addDummyPosts(20);
    }

    setPosts(posts: Post[]) {
        this.posts = posts;
        this.postsChanged.next(this.posts.slice());
    }

    getPosts() {
        return this.posts.slice();
    }

    getPost(index: number) {
        // return this.posts.slice()[index];
        return this.posts[index];
    }

    addPost(post: Post) {
        this.posts.push(post);
        this.postsChanged.next(this.posts.slice());
    }

    updatePost(index: number, newPost: Post) {
        this.posts[index] = newPost;
        this.postsChanged.next(this.posts.slice());
    }

    deletePost(index: number) {
        this.posts.splice(index, 1);
        this.postsChanged.next(this.posts.slice());
    }

}