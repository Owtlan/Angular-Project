import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Firestore, doc, getDocs, collection, query, where, limit } from '@angular/fire/firestore';

// import { collection, getDocs, limit, query } from 'firebase/firestore';
import { Router } from '@angular/router'; // Импорт на Router
import { Auth, user } from '@angular/fire/auth'; // Импорт на Firebase Auth
import { addDoc } from 'firebase/firestore'; // За взимане на документ за игра

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  
  @ViewChild('videoBackground') videoElement!: ElementRef;

  games: any[] = [];
  currentUserId: string | null = null;  // ID на текущия потребител
  purchasedGames: string[] = [];        // Списък с ID на вече закупени игри
  isLoggedIn: boolean = false;          // Състояние на логин


  constructor(private firestore: Firestore,private router: Router,private auth: Auth) { }


  async ngOnInit() {
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


    await this.fetchGames();
  }



  
  ngAfterViewInit() {
    this.playVideo();
  }

  async fetchGames() {
    const gamesCollection = collection(this.firestore, 'games');
    const gamesQuery = query(gamesCollection, limit(12))
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

      // video.playbackRate = 1;

      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }

  async buyGame(gameId: string) {
    if (!this.isLoggedIn) {
      // Ако не е логнат, го пренасочваме към страницата за логин
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/order'], { queryParams: { gameId: gameId } });
  }


  isGamePurchased(gameId: string): boolean {
    return this.purchasedGames.includes(gameId);
  }

  isGameCreatedByUser(game: any): boolean {
    return this.currentUserId === game.creatorId;
  }

}
