import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";

import { HttpClient, HttpHeaders } from '@angular/common/http'

// a partir do RxJS v6
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

// antes o RxJS v6
// import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/operator/map'

import { Order, OrderItem } from "app/order/order.model";

import { MEAT_API } from '../app.api'
// import { LoginService } from '../security/login/login.service'

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService, private http: HttpClient /*, private loginService: LoginService*/) { }

  itemsValue(): number {
    return this.cartService.total()
  }

  // expor os itens do carrinho
  cartItems(): CartItem[] {
    return this.cartService.items
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item)
  }

  clear() {
    this.cartService.clear()
  }

  // fazer chamada HTTP para tendo como retorno um Observable (com tipo de retorno string),
  // para que o componente possa se inscrever e receber uma determinada resposta
  checkOrder(order: Order): Observable<string> {

    // aqui no checkOrder é o momento em que vamos pegar a info do user autendicado e criar um header que vamos carregar o accesToken que recebemos no momento do login
    // let headers = new HttpHeaders()
    // if (this.loginService.isLoggedIn()) {
    //   headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
    // }
    // implementacao alterada para o HTTP Interceptors

    // importações necessárias
    // MEAT_API,
    // Headers, RequestOptions:: para enviar os headers no 3º param
    ///const headers = new Headers()
    ///headers.append('Content-Type', 'application/json') // nome do header e valor do header
    return this.http.post<Order>(`${MEAT_API}/orders`, order) // poderia ter um 3º param, que é o headers, ex: { headers: headers }
      ///JSON.stringify(order),
      ///new RequestOptions({ headers: headers }))
      ///.map(response => response.json())
      .pipe(map(order => order.id))

    // .map(response => response.json()) :: mapeia o response e retorna apenas o JSON
    // .map(order => order.id) :: mapeia o JSON order e retorna o id contido nele
  }

}
