import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Game } from '../model/game.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  games$: Observable<Game[]> | null = null;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.games$ = this.firebaseService.searchGamesByName(query);
      }
    });
  }
}
