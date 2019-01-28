import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  // labels (ex: Endereço, Número)
  @Input() label: string
  @Input() errorMessage: string

  // objeto que vamos fazer referência
  input: any

  // como param do ContentChild podemos usar uma "diretiva" ou "ref a um elemento"
  @ContentChild(NgModel) model: NgModel
  // Precisa do momento certo para usar este model, temos que usar o método AfterContentInit

  // FormControlName
  @ContentChild(FormControlName) control: FormControlName
  // O ngModel e o FormControlName têm as mesmas propriedades, pelo que o que foi implementado anteriormente, para 
  // o Template Forms, não terá problema.

  constructor() { }

  ngOnInit() {
  }

  // método que vai ser chamado exatamete quando o conteúdo que vai ficar no lugar do <ng-content> for definido
  ngAfterContentInit() {
    this.input = this.model || this.control

    // vamos checar se o conteúdo que está sendo informado realmente existe uma tag ngModel
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
