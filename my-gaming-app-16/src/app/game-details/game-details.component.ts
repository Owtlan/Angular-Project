import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { Game } from '../model/game.model';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  gameId: string | null = null;
  gameData: Game | null = null;
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.auth.onAuthStateChanged(user => {
      this.currentUserId = user ? user.uid : null;
    });

    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id');
      if (this.gameId) {
        this.firebaseService.getGameById(this.gameId).subscribe(data => {
          this.gameData = data;
        });
      }
    });
  }

  isCreator(): boolean {
    return this.currentUserId === this.gameData?.creatorId;
  }


  isLoggedIn(): boolean {
    return !!this.currentUserId;
  }


  editGame() {
    this.router.navigate(['/games', this.gameId, 'edit']);
  }

  deleteGame() {
    if (this.gameId) {
      this.firebaseService.deleteGame(this.gameId).then(() => {
        this.router.navigate(['/']);
      }).catch((error: any) => {
        console.error('Error deleting game:', error);
      });
    } else {
      console.error('Game ID is null. Cannot delete game.');
    }
  }

  // buyGame() {
  //   this.router.navigate(['/order'], { queryParams: { gameId: this.gameId } }); 
  // }

}