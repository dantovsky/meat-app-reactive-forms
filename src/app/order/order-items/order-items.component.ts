import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from "../../restaurant-detail/shopping-cart/cart-item.model";

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() items: CartItem[]

  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() decreaseQty = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit() {
  }

  // Criação dos métodos que já disparam esses eventos, e depois faz-se o link no template
  emitIncreaseQty(item: CartItem) {
    this.increaseQty.emit(item)
  }

  emitDecreaseQty(item: CartItem) {
    this.decreaseQty.emit(item)
  }

  emitRemove(item: CartItem) {
    this.remove.emit(item)
  }
}

/*
Vamos ter 3 eventos:
- remover
- aumentar a quant
- diminuir a quant

Precisamos criar o EventEmitter (importar Output e EventEmitter)
*/
