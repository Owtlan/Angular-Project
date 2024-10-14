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
            console.log('Game exists:', gameSnapshot.data()); // Проверка на данните
            return { id: gameSnapshot.id, ...gameSnapshot.data() }; // Връщайте и ID-то на играта
        } else {
            console.error('No such document! ID:', gameId); // Лог на ID-то
            return null;
        }
    }

    // Добавете този метод
    async getGamesByCategory(category: string): Promise<any[]> {
        const gamesRef = collection(this.firestore, 'games');
        const q = query(gamesRef, where('category', '==', category)); // Предполага се, че имате поле category в игрите
        const querySnapshot = await getDocs(q);

        const games = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return games;
    }
}
