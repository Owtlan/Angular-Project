import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { FirebaseService } from '../firebase.service';
import { Order } from '../model/order.model';
import { Auth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms'


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

  submitOrder(form: NgForm) {
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


  // validators

  formValid(): boolean {
    return this.isNameValid(this.name) &&
      this.isEmailValid(this.email) &&
      this.street.length > 0 &&
      this.isPhoneValid(this.phone);
  }

  isNameValid(name: string): boolean {
    const namePattern = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
    return namePattern.test(name) && name.trim().length > 0;
  }

  isPhoneValid(phone: string): boolean {
    const phonePattern = /^[0-9]+$/;
    return phonePattern.test(phone) && phone.trim().length > 0; 
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(abv\.bg|gmail\.com)$/;
    return emailPattern.test(email) && email.trim().length > 0;
  }

}
