import { Component, OnInit } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-gaming-app-16';

  currentUserId: string | null = null;

  constructor(private auth: Auth, private cartService: CartService) { }

  ngOnInit() {
    user(this.auth).subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
        // this.cartService.clearCart(this.currentUserId); // Изчистване на кошницата при нов вход
      } else {
        this.currentUserId = null;
        // this.cartService.clearCart('guest'); // Изчистване на кошницата при изход
      }
    });
  }

}
