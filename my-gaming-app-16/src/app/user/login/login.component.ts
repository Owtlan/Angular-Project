import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {
  @ViewChild('videoBackground') videoElement!: ElementRef;

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router) { }

  ngAfterViewInit() {
    this.playVideo();
  }

  playVideo() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;

    if (video) {
      video.muted = true;
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }


  login() {
    this.errorMessage = '';
    console.log('Attempting to log in with email:', this.email, 'and password:', this.password);
    console.log('Password length:', this.password.length);

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('User logged in: ', user);

        this.router.navigate(['/']);
      })
      .catch((error) => {
        const firebaseError = error as FirebaseError;
        console.log('Firebase error code:', firebaseError.code);
        console.error('Error message:', firebaseError.message);

        switch (firebaseError.code) {
          case 'auth/invalid-login-credentials':
            this.errorMessage = 'Invalid email or password. Please try again.';
            break;
          default:
            this.errorMessage = 'An unexpected error occurred. Please try again.';
            break;
        }
        console.error('Error logging in:', error);
      });

  }


}
