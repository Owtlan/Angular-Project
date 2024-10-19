import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartItems: any[] = []
  totalPrice: number = 0
  userId: string | null = null;

  constructor(private cartService: CartService, private router: Router, private auth: Auth) { }

  ngOnInit(): void {
    this.userId = this.auth.currentUser?.uid || null; // Вземаме текущия потребител
    if (this.userId) {
      this.cartItems = this.cartService.getCartItems(this.userId);
      this.totalPrice = this.cartService.getTotalPrice(this.userId);
    }
  }

  proceedToOrder() {
    this.router.navigate(['/order']);
  }

  clearCart() {
    if (this.userId) {
      this.cartService.clearCart(this.userId);
      this.cartItems = [];
      this.totalPrice = 0;
    }
  }
}
