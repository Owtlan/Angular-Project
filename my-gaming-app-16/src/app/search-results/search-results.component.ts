import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Game } from '../model/game.model';
import { Observable } from 'rxjs';
import { CartService } from '../service/cart.service'; 
import { Auth, user } from '@angular/fire/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  games$: Observable<Game[]> | null = null;
  isLoggedIn: boolean = false;
  currentUserId: string | null = null;
  purchasedGames: string[] = []


  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private cartService: CartService,
    private auth: Auth) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.games$ = this.firebaseService.searchGamesByName(query);
      }
    });
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

  addToCart(game: Game) {
    if (this.currentUserId) {
      this.cartService.addToCart(game, this.currentUserId);
      this.cartService.updateCartItemCount(this.currentUserId); 
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

  isGameCreatedByUser(game: Game): boolean {
    return this.currentUserId === game.creatorId;
  }
}
