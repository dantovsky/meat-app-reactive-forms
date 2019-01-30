
import { NgModule, ModuleWithProviders } from "@angular/core"
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Os componentes que vamos ter neste módulo são o: imput, radio e rating
import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'

// imports trazidos do CoreModule (que foi apagado)
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { OrderService } from "../order/order.service";
import { ScackbarComponent } from './messages/scackbar/scackbar.component';
import { NotificationService } from "./messages/notification.service";

@NgModule({
  declarations: [InputComponent, RadioComponent, RatingComponent, ScackbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputComponent, RadioComponent, RatingComponent, ScackbarComponent,
    CommonModule, FormsModule, ReactiveFormsModule]
})

export class SharedModule {
  // funcao que retorna um módulo com providers, que é basicamente a config do módulo + os providers que vamos importar aqui
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule, // ja vai ter todas as configs necessárias para importar em outros lugares
      providers: [ShoppingCartService, RestaurantsService, OrderService, NotificationService]
    }
  }
}
