import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service'; // Услуга за Firebase
import { Observable } from 'rxjs';
import { Game } from '../model/game.model'; // Модел за игра (опционално)

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  category: string | null = null;
  games$: Observable<Game[]> | null = null; // Използваме Observable за игрите

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    // Взимаме категорията от URL параметрите
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');

      if (this.category) {
        // Правим заявка към Firebase за извличане на игри според категорията
        this.games$ = this.firebaseService.getGamesByCategory(this.category);
      }
    });
  }
}
