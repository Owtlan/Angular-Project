import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
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
            return gameSnapshot.data();
        } else {
            console.error('No such document!');
            return null
        }
    }

}