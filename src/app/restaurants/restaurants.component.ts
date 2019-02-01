import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from './restaurants.service'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from' // usado para criar uma string a partir de um array
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]

  // propriedades para representar o fomr de pesquisa
  searchForm: FormGroup // será o valor para a diretiva "formGroup" :: <form [formGroup]="searchForm">
  searchControl: FormControl // (será o formControlName do input) :: referenciar para ouvir os valores que vão ser digitados

  // quando colocamos private ou public na frente de um arg do construtor,
  // o TypeScript vai gerar automaticamente uma propriedade no componente
  // ou seja, é o mesmo como se estivesse:
  // - declarando uma propriedade
  // - recebendo essa propriedade no construtor
  // - e fazendo a atribuição dentro do construtor
  constructor(private restaurantsService: RestaurantsService,
    private fb: FormBuilder) { }

  ngOnInit() {

    // instancias para o form de pesquisa
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    // Se inscrever no atributo valueChanges para ouvir o que o user está digitando
    // em vez de fazer um subscribe para pegar o termo e depois fazer outro subscribe
    // vamos utilizar o switchMap para poder trocar o Observable e fazer o subscribe uma vez só
    //
    // debounceTime(500) :: só vai deixar emitir um evento se a diferença entre dois eventos for maior que o tempo informado (milissegundos)
    // distictiUltilChanged() :: vai permitir apenas as mensagens que são diferentes umas das outras (se a mensagem seguinte for igual a da anterior, ele não vai mais subscrever a nova mensagem)
    //
    // do(function(searchTerm) { console.log(searchTerm) }) :: pode ser usado para debuggar no console o que o sistema está enviando para fazer o pedido a "API Server"
    //
    // switchMap() :: quando chega uma nova mensagem, o swichMap() faz o unsubsscribe do anterior. O switchMap irá resolver problemas entre vários requests que demoram tempos diferentes (muito comum com o uso da internet)
    //
    // catch() :: vamos usar um catch no observable de retorno do swichMap para não deixar o erro estourar e quebrar o ValueChange

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm =>
        this.restaurantsService
          .restaurants(searchTerm)
          .catch(error => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)

    // Usado quando usamos os arrays de exemplos
    // this.restaurants = this.restaurantsService.restaurants()
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }
}
