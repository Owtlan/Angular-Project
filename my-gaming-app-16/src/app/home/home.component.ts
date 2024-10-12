import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';


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
    const gamesSnapshot = await getDocs(gamesCollection);
    this.games = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

}
