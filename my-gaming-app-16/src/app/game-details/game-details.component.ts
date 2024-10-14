import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../service/game.service';


@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  gameId: string | null = null;
  gameData: any = null;


  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    console.log('Game ID:', this.gameId); 

    if (this.gameId) {
      this.gameService.getGameById(this.gameId).then(data => {
        this.gameData = data;
        console.log('Game Data:', this.gameData); 

      }).catch(error => {
        console.error('Error fetching game data:', error);
      })
    }

  }
}
