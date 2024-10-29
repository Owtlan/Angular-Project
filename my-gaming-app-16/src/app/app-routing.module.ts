import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../app/user/register/register.component';
import { LoginComponent } from '../app/user/login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './user/logout/logout.component';
import { CreateComponent } from './create/create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesComponent } from './games/games.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PriceFilterComponent } from './price-filter/price-filter.component'; // Импортирайте вашия компонент
import { redirectLoggedInToHome } from './redirect-logged-in.guard';



const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [redirectLoggedInToHome] },
  { path: 'login', component: LoginComponent, canActivate: [redirectLoggedInToHome] },
  { path: '', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'create', component: CreateComponent },
  { path: 'games/details/:id', component: GameDetailsComponent },
  { path: 'games/:category', component: GamesComponent },
  { path: 'games/:id/edit', component: EditGameComponent },
  { path: 'order', component: OrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'filter', component: PriceFilterComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
