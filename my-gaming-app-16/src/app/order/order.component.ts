import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { FirebaseService } from '../firebase.service';
import { Order } from '../model/order.model';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  street: string = '';
  phone: string = '';
  name: string = '';
  email: string = '';
  cartItems: any[] = [];
  totalPrice: number = 0;
  userId: string | undefined = undefined;

  constructor(
    private cartService: CartService,
    private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.auth.currentUser?.uid;

    if (this.userId) {
      this.cartItems = this.cartService.getCartItems(this.userId);
      this.totalPrice = this.cartService.getTotalPrice(this.userId);
    } else {
      alert('Трябва да сте логнат, за да направите поръчка.');
      this.router.navigate(['/login']);
    }
  }

  submitOrder() {
    const userId = this.auth.currentUser?.uid;

    if (!userId) {
      alert('Трябва да сте логнат, за да направите поръчка.');
      this.router.navigate(['/login']);
      return;
    }

    const order: Order = {
      userId: userId,
      items: this.cartItems,
      total: this.totalPrice,
      street: this.street,
      phone: this.phone,
      name: this.name,
      email: this.email,
      createdAt: new Date()
    };

    this.firebaseService.createOrder(order).then(() => {
      alert('Вашата поръчка e успешна!');
      this.cartService.clearCart(userId);
      this.router.navigate(['/']);
    });
  }
}
