import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { NotificationService } from '../notification.service'

// imports para a função de temporizador
// import { Observable } from 'rxjs/Observable'
import { Observable, timer } from 'rxjs'
import { tap, switchMap } from 'rxjs/operators'
// import 'rxjs/add/operator/do' // operador do foi renomeado para tap
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/observable/timer'

@Component({
  selector: 'mt-scackbar',
  templateUrl: './scackbar.component.html',
  styleUrls: ['./scackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: 0
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('300ms 0s ease-in')),
      transition('visible => hidden', animate('300ms 0s ease-out'))
    ])
  ]
})
export class ScackbarComponent implements OnInit {

  message: string = 'Hello there!'

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    // inscrever-se para as notificações
    this.notificationService.notifier
      // .do(message => console.log(message))
      .pipe(
        tap(message => {
          this.message = message
          this.snackVisibility = 'visible'
        }),
        switchMap(message => timer(3000)) // o switchMap faz o unsubscribe, caso ainda exista algum ativo e aciona um novo subscribe
      ).subscribe(timer => this.snackVisibility = 'hidden')
  }

  // para testar a anumação: criamos um botão no template: <button (click)="toggleSnack()">Click me</button>
  // toggleSnack() {
  //   this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible' : 'hidden'
  // }

}
