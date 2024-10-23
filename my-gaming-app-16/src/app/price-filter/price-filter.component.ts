import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Game } from '../model/game.model';


@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})



export class PriceFilterComponent implements OnInit {

  games: Game[] = [];
  filteredGames: Game[] = [];
  minPrice: number = 0;
  maxPrice: number = 100;
  maxPriceLimit: number = 100;



  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getGames().subscribe(games => {
      this.games = games;
      this.filteredGames = games;
    })
  }

  filteredGamesByPrice(): void {
    this.filteredGames = this.games.filter(game => game.price >= this.minPrice && game.price <= this.maxPrice);
  }

}
