import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { RestaurantsComponent } from './restaurants/restaurants.component'
import { AboutComponent } from './about/about.component'
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { OrderComponent } from "./order/order.component"
import { OrderSummaryComponent } from "./order-summary/order-summary.component";

// Nos detalhes de um restaurante é utilizado rotas de navegações filhas, para o funcionamento do submenu (menu e avaliações) existente na página
export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  {
    path: 'restaurants/:id', component: RestaurantDetailComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'reviews', component: ReviewsComponent }
    ]
  },
  { path: 'order', component: OrderComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'about', component: AboutComponent }
]
