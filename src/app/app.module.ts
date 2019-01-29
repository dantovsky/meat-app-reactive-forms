import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component'
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from './core/core.module'
// import { ShoppingCartService } from "./restaurant-detail/shopping-cart/shopping-cart.service";
// import { OrderComponent } from './order/order.component';
// import { OrderItemsComponent } from './order/order-items/order-items.component';
// import { InputComponent } from './shared/input/input.component';
// import { RadioComponent } from './shared/radio/radio.component';
// import { OrderService } from './order/order.service';
// import { DeliveryCostsComponent } from './order/delivery-costs/delivery-costs.component';
// import { AboutComponent } from './about/about.component'; // foi retirado tambem da lista de declaracoes
// import { RestaurantsService } from './restaurants/restaurants.service';
// import { RatingComponent } from './shared/rating/rating.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    CoreModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
