import { Component } from '@angular/core';

import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore'; // За Firestore
import { Router } from '@angular/router'; // За пренасочване след успешна регистрация

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  username: string = '';

  animateUsername: boolean = false;
  animateEmail: boolean = false;
  animatePassword: boolean = false;


  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { }

  register() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Записване на потребителя в Firestore
        const userDocRef = doc(this.firestore, 'users', user.uid);
        return setDoc(userDocRef, {
          email: this.email,
          username: this.username
        });
      })
      .then(() => {
        console.log('User registered and data saved to Firestore');
        this.router.navigate(['/']); // Пренасочване след успешна регистрация
      })
      .catch((error) => {
        console.error('Error registering user: ', error);
      });
  }

  animateField(field: string) {
    if (field === 'username') {
      this.animateUsername = true;
    } else if (field === 'email') {
      this.animateEmail = true;
    } else if (field === 'password') {
      this.animatePassword = true;
    }
  }
  removeAnimation(field: string) {
    if (field === 'username') {
      this.animateUsername = false;
    } else if (field === 'email') {
      this.animateEmail = false;
    } else if (field === 'password') {
      this.animatePassword = false;
    }
  }

}
