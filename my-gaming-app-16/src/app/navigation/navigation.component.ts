import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth'
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('searchAnimation', [
      state('hidden', style({
        opacity: 0,
        height: '0px',
        overflow: 'hidden'
      })),
      state('visible', style({
        opacity: 1,
        height: '*',
        overflow: 'visible'
      })),
      transition('hidden => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out'))
    ])
  ]
})


export class NavigationComponent {
  isLoggedIn = false;
  isSearchVisible = false;


  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  logout() {
    this.auth.signOut();
  }
}
