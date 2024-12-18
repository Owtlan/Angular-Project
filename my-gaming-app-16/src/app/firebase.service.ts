import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, docData, doc, query, where, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from './model/game.model'; // Модел за игра
import { Order } from './model/order.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  // deleteGame(gameId: string | null) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(public firestore: Firestore) { }

getGames(): Observable<Game[]> {
  const gamesCollection = collection(this.firestore, 'games');
  return collectionData(gamesCollection, { idField: 'id' }) as Observable<Game[]>;
}

  searchGamesByName(name: string): Observable<Game[]> {
    // Създаване на референция към колекцията 'games'
    const gamesCollection = collection(this.firestore, 'games');
    // Създаване на заявка за търсене по заглавие
    const q = query(
      gamesCollection,
      where('title', '>=', name),
      where('title', '<=', name + '\uf8ff')
    );

    // Връщане на Observable с игрите, които отговарят на заявката
    return collectionData(q, { idField: 'id' }) as Observable<Game[]>;
  }

  getGamesByCategory(category: string): Observable<Game[]> {
    const gamesCollection = collection(this.firestore, 'games');
    const q = query(gamesCollection, where('category', '==', category));
    return collectionData(q, { idField: 'id' }) as Observable<Game[]>;
  }


  getGameById(id: string): Observable<Game> {
    const gameDoc = doc(this.firestore, `games/${id}`);
    return docData(gameDoc, { idField: 'id' }) as Observable<Game>;
  }


  deleteGame(gameId: string): Promise<void> {
    const gameRef = doc(this.firestore, 'games', gameId);
    return deleteDoc(gameRef);
  }

  updateGame(gameId: string, updatedGameData: Partial<Game>): Promise<void> {
    const gameRef = doc(this.firestore, `games/${gameId}`);
    return updateDoc(gameRef, updatedGameData);
  }
  //order
  async createOrder(order: Order) {
    try {
      const ordersCollection = collection(this.firestore, 'orders');
      const docRef = await addDoc(ordersCollection, {
        ...order,
        createdAt: new Date()
      });
      console.log('Order added with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  }

}

