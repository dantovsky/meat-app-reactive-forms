import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Restaurant } from './restaurant/restaurant.model'
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model"

import { MEAT_API } from '../app.api'
import { ErrorHandler } from "../app.error-handler";

@Injectable()
export class RestaurantsService {

  // Receber injeção do serviço HTTP, utilizando a sintaxe reduzida
  constructor(private http: Http) {

  }

  restaurants(): Observable<Restaurant[]>{
    return this.http.get(`${MEAT_API}/restaurants`)
    .map(response => response.json())
    .catch(ErrorHandler.handleError)
  }

  // retornar um restaurant por ID
  restaurantById(id: string): Observable<Restaurant>{
    return this.http.get(`${MEAT_API}/restaurants/${id}`)
    .map(response => response.json())
    .catch(ErrorHandler.handleError)
  }

  // trazer as reviews de cada restaurante
  reviewsOfRestaurant(id: string): Observable<any>{
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    .map(response => response.json())
    .catch(ErrorHandler.handleError)
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]>{
    return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
    .map(response => response.json())
    .catch(ErrorHandler.handleError)
  }
}

// array de exemplo que estava na class RestaurantsService antes de fazer a API REST MEAT_API (com json-server)
/*
rests: Restaurant[] = [
  {
    id: "bread-bakery",
    name: "Bread & Bakery",
    category: "Bakery",
    deliveryEstimate: "25m",
    rating: 4.9,
    imagePath: "assets/img/restaurants/breadbakery.png",
  },
  {
    id: "burger-house",
    name: "Burger House",
    category: "Hamburgers",
    deliveryEstimate: "100m",
    rating: 3.5,
    imagePath: "assets/img/restaurants/burgerhouse.png",
  }]
  */

// SINTAXE REDUZIDA
// quando colocamos private ou public na frente de um arg do construtor,
// o TypeScript vai gerar automaticamente uma propriedade no componente
// ou seja, é o mesmo como se estivesse:
// - declarando uma propriedade
// - recebendo essa propriedade no construtor
// - e fazendo a atribuição dentro do construtor
