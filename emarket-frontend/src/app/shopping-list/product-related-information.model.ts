// This model is used for storing params, body 
export class ProductRelatedInformation {
    // constructor(public pid: string, public key: string, public name: string, public value: string) {}
    constructor(public pid: string, public type: string, public key: string, public name: string, public value: string) {}
}