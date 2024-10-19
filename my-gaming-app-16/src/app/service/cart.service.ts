import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})


export class CartService {
    private cartItems: any[] = [];

    constructor() { }


    addToCart(game: any, userId: string) {
        const cartItems = this.getCartItems(userId);
        cartItems.push(game);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
      }

      getCartItems(userId: string): any[] {
        const storedCart = localStorage.getItem(`cart_${userId}`);
        return storedCart ? JSON.parse(storedCart) : [];
      }

      getTotalPrice(userId: string): number {
        const cartItems = this.getCartItems(userId);
        return cartItems.reduce((total, game) => total + game.price, 0);
      }

      clearCart(userId: string) {
        localStorage.removeItem(`cart_${userId}`);
      }
}