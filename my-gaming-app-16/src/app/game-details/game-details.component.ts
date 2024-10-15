import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service'; // Firebase услуга
import { Observable } from 'rxjs';
import { Game } from '../model/game.model'; // Модел за игра

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  gameId: string | null = null;
  gameData: Game | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

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
}