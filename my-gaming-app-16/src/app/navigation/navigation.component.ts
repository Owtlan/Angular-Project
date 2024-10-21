import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CartService } from '../service/cart.service';
import { FirebaseService } from '../firebase.service'; // Импортирайте вашия FirebaseService
import { Router } from '@angular/router'; // Импортирайте Router


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
  cartItemCount: number = 0;
  currentUserId: string | null = null;
  searchQuery: string = '';

  constructor(private auth: Auth, private cartService: CartService, private firebaseService: FirebaseService, private router: Router) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUserId = user.uid;
        this.updateCartItemCount(); // Обнови броя на продуктите в количката
      } else {
        this.isLoggedIn = false;
        this.currentUserId = null;
        this.cartItemCount = 0;
      }
    });

    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count; // Актуализирайте cartItemCount
    });

    // Слушайте за изчистване на количката
    this.cartService.cartCleared$.subscribe(() => {
      this.cartItemCount = 0; // Занулява брояча при изчистване
      console.log('Cart cleared, item count set to 0');
    });
  }

  updateCartItemCount() {
    if (this.currentUserId) {
      this.cartItemCount = this.cartService.getCartItemCount(this.currentUserId);
      console.log('Cart item count updated:', this.cartItemCount);
    }
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  logout() {
    this.auth.signOut();
  }

  searchGames() {
    if (this.searchQuery.trim()) {
      // Преминете към страницата с резултатите от търсенето
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });

      this.isSearchVisible = false;
      this.searchQuery = ''; // Изчистете текста
    }
  }
}
