import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit {
  @ViewChild('videoBackground') videoElement!: ElementRef;

  email: string = '';
  password: string = '';

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
