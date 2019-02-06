import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service'
import { Observable } from "rxjs"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  // neste, NÃO vamos usar o SUBSCRIBE dentro o ngOnInit, vamos usar o PIPE Async no template HTML
  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantsService.reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}
