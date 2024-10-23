import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc, collection, getDocs, query, where } from '@angular/fire/firestore'; // Импортиране на необходимите функции
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class GameService {

    constructor(private firestore: Firestore) { }

    async getGameById(gameId: string): Promise<any> {
        const gameRef = doc(this.firestore, 'games', gameId);
        const gameSnapshot = await getDoc(gameRef);

        if (gameSnapshot.exists()) {
            console.log('Game exists:', gameSnapshot.data());
            return { id: gameSnapshot.id, ...gameSnapshot.data() };
        } else {
            console.error('No such document! ID:', gameId); 
            return null;
        }
    }

    async getGamesByCategory(category: string): Promise<any[]> {
        const gamesRef = collection(this.firestore, 'games');
        const q = query(gamesRef, where('category', '==', category)); 
        const querySnapshot = await getDocs(q);

        const games = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return games;
    }
}
