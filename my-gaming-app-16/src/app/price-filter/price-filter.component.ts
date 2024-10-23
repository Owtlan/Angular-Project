import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Game } from '../model/game.model';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDocs, collection, query, where, limit } from '@angular/fire/firestore';
import { CartService } from '../service/cart.service'; 

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})



export class PriceFilterComponent implements OnInit {

  games: Game[] = [];
  filteredGames: Game[] = [];
  minPrice: number = 0;
  maxPrice: number = 100;
  maxPriceLimit: number = 500;
  isLoggedIn: boolean = false;
  currentUserId: string | null = null;
  purchasedGames: string[] = [];


  constructor(private firebaseService: FirebaseService, private auth: Auth, private cartService: CartService,) { }

  ngOnInit(): void {
    this.firebaseService.getGames().subscribe(games => {
      this.games = games;
      this.filteredGames = games;
    })

    user(this.auth).subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.currentUserId = user.uid;
        this.loadPurchasedGames(); 
      } else {
        this.isLoggedIn = false;
        this.currentUserId = null;
      }
    });
  }


  filteredGamesByPrice(): void {
    this.filteredGames = this.games.filter(game => game.price >= this.minPrice && game.price <= this.maxPrice);
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


  isGameCreatedByUser(game: Game): boolean {
    return this.currentUserId === game.creatorId; // Проверка дали играта е създадена от текущия потребител
  }

  addToCart(game: Game): void {
    if (this.currentUserId) {
      // Добави логиката за добавяне на играта в количката тук
      this.cartService.addToCart(game, this.currentUserId);
      this.cartService.updateCartItemCount(this.currentUserId); 
      console.log(`Added to cart: ${game.title}`);
      alert(`${game.title} беше добавена в количката.`);
    } else {
      alert('Трябва да сте логнат, за да добавите игра в количката.');
    }
  }
}
