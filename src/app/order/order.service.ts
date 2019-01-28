import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";

import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { Order, OrderItem } from "app/order/order.model";

import { MEAT_API } from '../app.api'

@Injectable()
export class OrderService {

  constructor(private cartService: ShoppingCartService, private http: Http) { }

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

    // importações necessárias
    // MEAT_API,
    // Headers, RequestOptions:: para enviar os headers no 3º param
    const headers = new Headers()
    headers.append('Content-Type', 'application/json') // nome do header e valor do header
    return this.http.post(`${MEAT_API}/orders`,
      JSON.stringify(order),
      new RequestOptions({ headers: headers }))
      .map(response => response.json())
      .map(order => order.id)

    // .map(response => response.json()) :: mapeia o response e retorna apenas o JSON
    // .map(order => order.id) :: mapeia o JSON order e retorna o id contido nele
  }

}
