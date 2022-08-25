export class CarouselSlide {
    public slideNumber!: number;
    public imgUrl!: string;
    public htmlContent!: string;
    public contentUrl!: string;

    constructor(
        slideNumber: number,
        imgUrl: string,
        htmlContent: string,
        contentUrl: string,
    ) {
        this.slideNumber = slideNumber;
        this.htmlContent = htmlContent;
        this.imgUrl = imgUrl;
        this.contentUrl = contentUrl;
    }
}