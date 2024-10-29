import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CartService } from '../service/cart.service';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';


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

  showCartPreview = false;
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private auth: Auth, private cartService: CartService, private firebaseService: FirebaseService, private router: Router) {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUserId = user.uid;
        this.updateCartItemCount();
      } else {
        this.isLoggedIn = false;
        this.currentUserId = null;
        this.cartItemCount = 0;
      }
    });

    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
      this.updateCartData();
    });


    this.cartService.cartCleared$.subscribe(() => {
      this.cartItemCount = 0;
      this.cartItems = [];
      this.totalPrice = 0;
      console.log('Cart cleared, item count set to 0');
    });
  }


  loadCartItems() {
    if (this.currentUserId) {
      this.cartItems = this.cartService.getCartItems(this.currentUserId);
      this.totalPrice = this.cartService.getTotalPrice(this.currentUserId);
    }
  }


  removeFromCart(index: number, event: Event){
    event.stopPropagation();
    if(this.currentUserId){
      this.cartService.removeFromCart(index,this.currentUserId);
      this.loadCartItems()
    }
  }




  updateCartData() {
    if (this.currentUserId) {
      this.cartItems = this.cartService.getCartItems(this.currentUserId);
      this.totalPrice = this.cartService.getTotalPrice(this.currentUserId);
    }
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
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });

      this.isSearchVisible = false;
      this.searchQuery = '';
    }
  }
}
