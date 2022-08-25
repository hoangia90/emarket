import { ProductRelatedInformation } from "./product-related-information.model";

// The service contains not only information about a product but its related information
export class Service {
    constructor(
        // public id: number,
        public id: string,
        public productId: string,
        public productName: string,
        // public productDescription: string,
        // public productUrl: string,
        // public inputAddress: string,
        public database: string,
        public shippingMode: String,
        public unitPrice: number,
        public quantity: number,
        public productRelatedInformation: ProductRelatedInformation[]
        ) {}
}