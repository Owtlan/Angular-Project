import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, docData, doc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from './model/game.model'; // Модел за игра

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) { }

  // Връщаме Observable за игрите с конкретната категория
  getGamesByCategory(category: string): Observable<Game[]> {
    const gamesCollection = collection(this.firestore, 'games');
    const q = query(gamesCollection, where('category', '==', category));
    return collectionData(q, { idField: 'id' }) as Observable<Game[]>;
  }

  // Връщаме Observable за играта по ID
  getGameById(id: string): Observable<Game> {
    const gameDoc = doc(this.firestore, `games/${id}`);
    return docData(gameDoc, { idField: 'id' }) as Observable<Game>;
  }
}

