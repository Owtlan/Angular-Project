import { Component } from '@angular/core';
import { Router } from '@angular/router';

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



constructor(private router: Router){}

submitOrder(){

  console.log('Order submitted:', {
    street: this.street,
    phone: this.phone,
    name: this.name,
    email: this.email
  });

  alert('your purchase is done! Thank you!');
  this.router.navigate(['/']); // Пренасочване към началната страница или друга

}

}
