import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Firestore, doc, getDocs, collection, query, where, limit } from '@angular/fire/firestore';

import { Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth'; 
import { CartService } from '../service/cart.service';
import { orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {


  @ViewChild('videoBackground') videoElement!: ElementRef;

  games: any[] = [];
  currentUserId: string | null = null; 
  purchasedGames: string[] = [];       
  isLoggedIn: boolean = false;          

  //new
  constructor(private firestore: Firestore, private router: Router, private auth: Auth, private cartService: CartService) { }


  async ngOnInit() {
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


    await this.fetchGames();
  }

  addToCart(game: any) {
    if (this.currentUserId) {
      this.cartService.addToCart(game, this.currentUserId);
      this.cartService.updateCartItemCount(this.currentUserId); 
      // alert(`${game.title} беше добавена в кошницата.`);


    } else {
      alert('Трябва да сте логнат, за да добавите игра в кошницата.');
    }
  }

  ngAfterViewInit() {
    this.playVideo();
  }

  async fetchGames() {
    const gamesCollection = collection(this.firestore, 'games');
    const gamesQuery = query(gamesCollection, orderBy('createdAt', 'desc'), limit(6))
    const gamesSnapshot = await getDocs(gamesQuery);
    this.games = gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async loadPurchasedGames() {
    if (!this.currentUserId) return;

    const ordersCollection = collection(this.firestore, 'orders');
    const q = query(ordersCollection, where('userId', '==', this.currentUserId));
    const ordersSnapshot = await getDocs(q);

    this.purchasedGames = ordersSnapshot.docs.map(doc => doc.data()['gameId']);
  }




  playVideo() {
    const video: HTMLVideoElement = this.videoElement.nativeElement;


    if (video) {
      video.muted = true;

      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }



  isGamePurchased(gameId: string): boolean {
    return this.purchasedGames.includes(gameId);
  }

  isGameCreatedByUser(game: any): boolean {
    return this.currentUserId === game.creatorId;
  }

}
