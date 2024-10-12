import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private auth: Auth, private router: Router) { }

  login() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('User logged in: ', user);

        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log('Error logging in: ', error);

      })
  }


}
