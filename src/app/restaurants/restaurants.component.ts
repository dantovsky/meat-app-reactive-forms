import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from './restaurants.service'


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[]

  // quando colocamos private ou public na frente de um arg do construtor,
  // o TypeScript vai gerar automaticamente uma propriedade no componente
  // ou seja, é o mesmo como se estivesse:
  // - declarando uma propriedade
  // - recebendo essa propriedade no construtor
  // - e fazendo a atribuição dentro do construtor
  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit() {

    this.restaurantsService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants)

    // Usado quando usamos os arrays de exemplos
    // this.restaurants = this.restaurantsService.restaurants()
  }
}
