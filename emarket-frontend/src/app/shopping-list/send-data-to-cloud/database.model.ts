export class Database {
    name!: string;
    value!: string;
    linkID!: string;
    constructor(
        name: string,
        value: string,
        linkID: string,
    ) {
        this.name = name;
        this.value = value;
        this.linkID = linkID;
    }
}
