import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})


export class CartService {
  private cartItems: { [userId: string]: any[] } = {};
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();


  constructor() { }


addToCart(game: any, userId: string): void {
    if (!this.cartItems[userId]) {
      this.cartItems[userId] = [];
    }
    this.cartItems[userId].push(game);
    this.cartItemCountSubject.next(this.getCartItemCount(userId)); // Обновете брояча
  }

  getCartItems(userId: string): any[] {
    return this.cartItems[userId] || [];
  }
  getCartItemCount(userId: string): number {
    const count = this.cartItems[userId] ? this.cartItems[userId].length : 0;
    console.log(`User ${userId} cart item count:`, count); // Отстраняване на проблеми
    return count;
  }
  getTotalPrice(userId: string): number {
    const cartItems = this.getCartItems(userId);
    return cartItems.reduce((total, game) => total + game.price, 0);
  }
  updateCartItemCount(userId: string): number {
    return this.getCartItemCount(userId);
}
  clearCart(userId: string) {
    this.cartItems[userId] = [];
    localStorage.removeItem(`cart_${userId}`);
  }
}