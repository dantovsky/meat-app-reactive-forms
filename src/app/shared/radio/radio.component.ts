import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from "./radio-option.model";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]

  value: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any) {
    this.value = value
    this.onChange(this.value)
  }

  /**
   * Metodo que vai ser chamado pelas diretivas quando elas querem passar um valor para o seu componente
   * Write a new value to the element.
   */
  writeValue(obj: any): void {
    this.value = obj
  }
  /**
   * Eles passam uma funcao para a gente, que a gente tem que chamar essa funcao sempre que o valor interno do componente mudar
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void { }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState?(isDisabled: boolean): void { }

}
