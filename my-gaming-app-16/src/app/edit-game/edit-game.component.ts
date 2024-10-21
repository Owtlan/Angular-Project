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
          this.gameData = data; // Зареждане на текущите данни за играта
        });
      }
    });
  }

  // loadGameData() {
  //   // Симулирай забавяне с 2 секунди
  //   setTimeout(() => {
  //     // Тук добави логиката за зареждане на данните на играта
  //     // Например:
  //     this.gameData = {
  //       title: 'Example Game',
  //       description: 'This is an example game description.',
  //       price: 59.99,
  //       category: 'Action',
  //       imageUrl: 'http://example.com/image.jpg',
  //       creatorId: 'example-creator-id'
  //     };
  //   }, 2000); // 2000 милисекунди = 2 секунди
  // }


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
