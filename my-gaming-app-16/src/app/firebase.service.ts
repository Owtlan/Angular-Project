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
        createdAt: new Date() // Записваме текущата дата
      });
      console.log('Order added with ID: ', docRef.id);
      return docRef.id; // Връщаме ID на новата поръчка
    } catch (error) {
      console.error('Error creating order:', error);
      return null; // Връщаме null при грешка
    }
  }

}

