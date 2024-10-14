import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc, doc } from 'firebase/firestore'; // Добавено е `doc` за работа с документите
import { Router } from '@angular/router'; // За навигиране към детайлите

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
  imageUrl: string = '';

  constructor(private firestore: Firestore, private router: Router) { }

  async addGame() {
    const gameData = {
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category,
      imageUrl: this.imageUrl,
    };

    try {
      const gamesCollection = collection(this.firestore, 'games');
      
      // Добавяме играта в Firebase и получаваме ID на новия документ
      const docRef = await addDoc(gamesCollection, gameData);
      console.log('Game added with ID: ', docRef.id);  // Тук получаваш ID на играта

      // Навигиране към страницата с детайли за играта след успешно създаване
      this.router.navigate(['/games', docRef.id]); // Пренасочва към страницата за детайли на играта
    } catch (error) {
      console.error('Error adding game: ', error);
    }
  }
}

