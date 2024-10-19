import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { [userId: string]: any[] } = {};
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private cartClearedSubject = new BehaviorSubject<boolean>(false); // Добавяме Subject за изчистване на количката

  cartItemCount$ = this.cartItemCountSubject.asObservable();
  cartCleared$ = this.cartClearedSubject.asObservable(); // Обсервируем промените

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
    this.cartClearedSubject.next(true); // Уведомяване, че количката е изчистена
  }

  getTotalPrice(userId: string): number {
    const items = this.getCartItems(userId);
    return items.reduce((total, item) => total + item.price, 0);
  }
}
