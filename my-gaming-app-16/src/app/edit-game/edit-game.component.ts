import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Game } from '../model/game.model';


@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  gameId: string | null = null;
  gameData: Game | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id');
      if (this.gameId) {
        this.firebaseService.getGameById(this.gameId).subscribe(data => {
          this.gameData = data; 
        });
      }
    });
  }



  updateGame() {
    if (this.gameData && this.gameId) {

      this.firebaseService.updateGame(this.gameId, this.gameData)
        .then(() => {
          this.router.navigate(['/games/details', this.gameId]);
        })
        .catch(error => {
          console.log('Error updating game:', error);
        })
    }
  }

}
