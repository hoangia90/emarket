// import { Category } from "../shared/tag.model";


export class User {
    // public id: number;

    // public id: string;
    // public password: string;
    // public contract: number[];

    // public email!: string;
    // public firstName!: string;
    // public lastName!: string;
    // public createdDate!: string;
    // public UpdatedDate!: string;
    // public profileImagePath!: string;

    // public id: number;
    // public id: string;
    // public password: string;
    // public contract: number[];
    // public email!: string;
    // public firstName!: string;
    // public lastName!: string;
    // public createdDate!: string;
    // public UpdatedDate!: string;
    // public profileImagePath!: string;

    public id!: number;
    public username!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;

    public token?: string;
    public email?: string;
    public phone?: string;
    public avatarUrl?: string;
    public created?: string;
    public modified?: string;
    public status?: string;

    constructor(
        id: number,
        username: string,
        password: string,
        firstName: string,
        lastName: string,

        // token: string,
        // email: string,
        // phone: string,
        // avatarUrl: string,
        // created: string,
        // modified: string,
        // status: string,
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;

        // this.token = token;
    }
}