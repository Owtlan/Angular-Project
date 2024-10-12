import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent {

  constructor(private auth: Auth, private router: Router) { }


  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('User logged out');
        this.router.navigate(['/login'])
      })
      .catch((error)=>{
        console.error('Error logging out: ', error);
        
      })
  }

}
