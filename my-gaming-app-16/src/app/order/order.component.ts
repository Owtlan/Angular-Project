import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Order } from '../model/order.model'; // Импорт на интерфейса
import { ActivatedRoute } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  street: string = '';
  phone: string = '';
  name: string = '';
  email: string = '';
  gameId: string | null = null;


  constructor(private router: Router, private firebaseService: FirebaseService, private route: ActivatedRoute,private auth: Auth) {
    this.route.queryParams.subscribe(params => {
      this.gameId = params['gameId']; // Получаване на gameId от URL параметрите
    });

  }

  submitOrder() {
    if (this.gameId) {
      const order: Order = {
        gameId: this.gameId,
        userId: this.auth.currentUser?.uid || '',
        street: this.street,
        phone: this.phone,
        name: this.name,
        email: this.email,
        createdAt: new Date()
      };
      this.firebaseService.createOrder(order).then(() => {
        alert('Вашата поръчка е получена! Благодарим ви!');
        this.router.navigate(['/']); // Пренасочване след успешна поръчка
      });
    }
  }
}
