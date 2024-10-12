import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  title: string = '';
  description: string = '';
  price: number = 0;
  category: string = '';
  imageUrl: string = ''; // Променена променлива за URL на изображението

  constructor(private firestore: Firestore) { }

  async addGame() {
    const gameData = {
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category,
      imageUrl: this.imageUrl, // Използване на URL-то от полето
    };

    try {
      const gamesCollection = collection(this.firestore, 'games');
      await addDoc(gamesCollection, gameData);
      console.log('Game added successfully');
    } catch (error) {
      console.error('Error adding game: ', error);
    }
  }
}

