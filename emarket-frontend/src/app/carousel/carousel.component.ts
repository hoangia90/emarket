import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CarouselSlide } from './carousel-slide.model';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  carousel: CarouselSlide[] = [];
  subscription!: Subscription;

  constructor(private carouselService: CarouselService) { 
  }

  ngOnInit(): void {
    this.subscription = this.carouselService.carouselChanged.subscribe(
      (carousel: CarouselSlide[]) => {
        this.carousel = carousel;
      }
    )
    this.carousel = this.carouselService.getCarousel()
  }

}
