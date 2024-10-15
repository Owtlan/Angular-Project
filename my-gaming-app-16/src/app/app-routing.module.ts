import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../app/user/register/register.component';
import { LoginComponent } from '../app/user/login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './user/logout/logout.component';
import { CreateComponent } from './create/create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'create', component: CreateComponent },
  { path: 'games/details/:id', component: GameDetailsComponent },
  { path: 'games/:category', component: GamesComponent }, 
 
  
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
