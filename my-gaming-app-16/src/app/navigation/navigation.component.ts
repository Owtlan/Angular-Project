import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})


export class NavigationComponent {
  isLoggedIn = false;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }
  logout() {
    this.auth.signOut();
  }
}
