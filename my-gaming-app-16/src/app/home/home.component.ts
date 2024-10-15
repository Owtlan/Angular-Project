import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, limit, query } from 'firebase/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: any[] = [];

  constructor(private firestore: Firestore) { }


  async ngOnInit() {
    await this.fetchGames();
  }


  async fetchGames() {
    const gamesCollection = collection(this.firestore, 'games');
    const gamesQuery = query(gamesCollection, limit(12))
    const gamesSnapshot = await getDocs(gamesQuery);
    this.games = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

}
