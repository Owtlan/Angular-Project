import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { [userId: string]: any[] } = {};
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private cartClearedSubject = new BehaviorSubject<boolean>(false); 

  cartItemCount$ = this.cartItemCountSubject.asObservable();
  cartCleared$ = this.cartClearedSubject.asObservable(); 

  constructor() { }

  addToCart(game: any, userId: string): void {
    if (!this.cartItems[userId]) {
      this.cartItems[userId] = [];
    }
    this.cartItems[userId].push(game);
    this.updateCartItemCount(userId);
  }

  getCartItems(userId: string): any[] {
    return this.cartItems[userId] || [];
  }

  getCartItemCount(userId: string): number {
    return this.cartItems[userId] ? this.cartItems[userId].length : 0;
  }

  updateCartItemCount(userId: string) {
    const count = this.getCartItemCount(userId);
    this.cartItemCountSubject.next(count);
    console.log(count);

  }

  clearCart(userId: string) {
    this.cartItems[userId] = [];
    this.updateCartItemCount(userId);
    this.cartClearedSubject.next(true);
  }

  getTotalPrice(userId: string): number {
    const items = this.getCartItems(userId);
    return items.reduce((total, item) => total + item.price, 0);
  }

  //remove single target from cart
  removeFromCart(index: number, userId: string): void {
    if (this.cartItems[userId]) {
      this.cartItems[userId].splice(index, 1)
      this.updateCartItemCount(userId)
    }
  }
}
