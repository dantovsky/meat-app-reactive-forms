import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { RestaurantsService } from '../restaurants/restaurants.service'
import { Restaurant } from "../restaurants/restaurant/restaurant.model";


@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  // a prop restaurant é undefined no momento da criação do component. Ela so vai ser preenchida
  // quando o metodo OnInit for chamado e o metodo subscribe for chamado.
  // aí sim, o Observable vai fazer a chamada http, e essa chamada pode demorar, e só
  // depois disso é que o obj é definido. Para evitar erros e falta de informação,
  // no html deverá adicionar o operator de navegação segura ("?") para evitar essa falha.
  // ex: {{restaurant?.name}}
  restaurant: Restaurant

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // 2 maneiras de acessar o route: SNAPSHOT ou SUBSCRIBE
    // como só queremos acessar 1 vez, podemos usar o SNAPSHOT
    this.restaurantsService.restaurantById(this.route.snapshot.params['id']).subscribe(restaurant => this.restaurant = restaurant)
  }

}
