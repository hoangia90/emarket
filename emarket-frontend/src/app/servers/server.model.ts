export class Server {
    public id: string;
    public name: string;
    public userName: string;
    public password: string;
    public authUrl: string;
    //
    public partnerId: string;
    public contractId: string;
    public requestId: string;

    constructor(
        id: string,
        name: string,
        userName: string,
        password: string,
        authUrl: string,
        partnerId: string,
        contractId: string,
        requestId: string,
        //
    ) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.authUrl = authUrl;
        //
        this.partnerId = partnerId;
        this.contractId = contractId;
        this.requestId = requestId;
    }
}