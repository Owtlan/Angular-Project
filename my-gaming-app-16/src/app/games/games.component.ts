import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service'; // Услуга за Firebase
import { Observable } from 'rxjs';
import { Game } from '../model/game.model'; // Модел за игра (опционално)
import { Firestore, doc, getDocs, collection, query, where, limit } from '@angular/fire/firestore';

import { CartService } from '../service/cart.service';  // Услуга за количката
import { Auth, user } from '@angular/fire/auth';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  category: string | null = null;
  games$: Observable<Game[]> | null = null;
  currentUserId: string | null = null;
  purchasedGames: string[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private cartService: CartService,  // Вземи услугата за количката
    private auth: Auth                 // Firebase Auth за проверка дали е логнат
  ) { }

  ngOnInit(): void {
    // Взимаме категорията от URL параметрите
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');

      if (this.category) {
        // Правим заявка към Firebase за извличане на игри според категорията
        this.games$ = this.firebaseService.getGamesByCategory(this.category);
      }
    });

    // Проверяваме дали потребителят е логнат
    user(this.auth).subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUserId = user.uid;
        this.loadPurchasedGames(); // Зареждане на поръчаните игри
      } else {
        this.isLoggedIn = false;
        this.currentUserId = null;
      }
    });
  }

  addToCart(game: any) {
    if (this.currentUserId) {
      this.cartService.addToCart(game, this.currentUserId);
      this.cartService.updateCartItemCount(this.currentUserId);  // Ъпдейтваме брояча на количката
      alert(`${game.title} беше добавена в количката.`);
    } else {
      alert('Трябва да сте логнат, за да добавите игра в количката.');
    }
  }

  async loadPurchasedGames() {
    if (!this.currentUserId) return;

    const ordersCollection = collection(this.firebaseService.firestore, 'orders');
    const q = query(ordersCollection, where('userId', '==', this.currentUserId));
    const ordersSnapshot = await getDocs(q);

    this.purchasedGames = ordersSnapshot.docs.map(doc => doc.data()['gameId']);
  }

  isGamePurchased(gameId: string): boolean {
    return this.purchasedGames.includes(gameId);
  }

  isGameCreatedByUser(game: any): boolean {
    return this.currentUserId === game.creatorId;
  }
}

