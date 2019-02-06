import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms'

import { Router } from '@angular/router'

import { RadioOption } from "../shared/radio/radio-option.model";
import { OrderService } from "./order.service";
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model'
import { Order, OrderItem } from "./order.model"

// import 'rxjs/add/operator/do'
import { tap } from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  // expressoes regulares
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8

  orderId: string

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  // precisamos receber o FormBuilder como injeção de dependencia
  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: new FormControl('', { validators: [Validators.required], updateOn: 'change' })
    }, { validators: [OrderComponent.equalsTo], updateOn: 'blur' }) // blur (validar quando o foco sai do campo), pode aplicar a nível do grupo ou campo a campo
  }

  // funcao para validar se os dois campos de email sao iguais Retorna um objeto com um key-value par key string : boolean
  // em formBuilder.group (acima), precisou colocar { validator: OrderComponent.equalsTo } e importar o AbstractControl
  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    // se um dos campos nao existirem, retorna undefined
    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return { emailNotMatch: true }
    }
    return undefined
  }

  // o valor dos itens, já temos isso implementado no "carrinho de compras"
  // então precisamos criar uma funcao e tambem criar um método no OrderService
  // que repassa para o CartService
  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  // expor os itens do carrinho
  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  // precisamos ter também o método de aumentar e diminuir
  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

  checkOrder(order: Order) {
    // transformar os itens que sao cartItems para orderItems
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = orderId
      }))
      .subscribe((orderId: string) => {

        // navegação programática via Router :: import Router, instanciar no constructor e usar o método navigate()
        this.router.navigate(['/order-summary'])

        console.log(`Compra concluída: ${orderId}`)
        console.log(orderId)
        this.orderService.clear()
      })
    //console.log(order)
  }
}
