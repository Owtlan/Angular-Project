import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})


export class CartService {
    private cartItems: any[] = [];

    constructor() { }


    addToCart(game: any) {
        this.cartItems.push(game);
    }

    getCartItems() {
        return this.cartItems;
    }

    getTotalPrice() {
        return this.cartItems.reduce((sum, game) => sum + game.price, 0);
    }

    clearCart() {
        this.cartItems = [];
    }
}