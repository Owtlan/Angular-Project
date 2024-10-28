import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('videoBackground') videoElement!: ElementRef;

  email: string = '';
  password: string = '';
  rePass: string = '';
  username: string = '';
  errorMessage: string = '';

  animateUsername: boolean = false;
  animateEmail: boolean = false;
  animatePassword: boolean = false;


  constructor(private auth: Auth, private firestore: Firestore, private router: Router) { }

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


  async register() {
    this.errorMessage = ''; 


    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.password !== this.rePass) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    try {
    
      const usersRef = collection(this.firestore, 'users');
      const emailQuery = query(usersRef, where('email', '==', this.email));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        this.errorMessage = 'Email is already in use. Please use another email.';
        return;
      }

      const usernameQuery = query(usersRef, where('username', '==', this.username));
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        this.errorMessage = 'Username is already taken. Please choose a different one.';
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

   
      const userDocRef = doc(this.firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        email: this.email,
        username: this.username
      });

      console.log('User registered and data saved to Firestore');
      this.router.navigate(['/']); 

    } catch (error) {
      const firebaseError = error as FirebaseError; 


      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'Email is already in use. Please use another email.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'Invalid email address format.';
          break;
        default:
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          break;
      }
      console.error('Error registering user:', error);
    }
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
