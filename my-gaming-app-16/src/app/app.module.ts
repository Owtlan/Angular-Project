import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // За ngModel
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage'; // Импорт на Storage

import { environment } from '../environments/environment';
import { LogoutComponent } from './user/logout/logout.component';
import { CreateComponent } from './create/create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesComponent } from './games/games.component';

import { EditGameComponent } from './edit-game/edit-game.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    CreateComponent,
    GameDetailsComponent,
    GamesComponent,
    EditGameComponent,
    OrderComponent,
    CartComponent,
    SearchResultsComponent,
    PriceFilterComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // За ngModel
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), // Добави Storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
