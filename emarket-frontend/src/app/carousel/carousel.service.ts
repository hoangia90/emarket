import { Subject } from "rxjs/internal/Subject";
import { CarouselSlide } from "./carousel-slide.model";

export class CarouselService {
    private carousel: CarouselSlide[] = [
        new CarouselSlide(
            0,
            'https://placeimg.com/1080/500/animals',
            ' <h2>Carousel Demo</h2><p><br></p><p>This is a carousel demo</p> ',
            'http://google.com'
        ),
        new CarouselSlide(
            1,
            'https://placeimg.com/1080/500/animals',
            ' <h2>Carousel Demo</h2><p><br></p><p>This is a carousel demo</p> ',
            'http://google.com'
        ),
        new CarouselSlide(
            2,
            'https://placeimg.com/1080/500/animals',
            ' <h2>Carousel Demo</h2><p><br></p><p>This is a carousel demo</p> ',
            'http://google.com'
        ),
    ];

    carouselChanged = new Subject<CarouselSlide[]>();

    getCarousel() {
        return this.carousel.slice();
    }

    getCarouselSlide(slideNumber: number) {
        return this.carousel[slideNumber];
    }

}