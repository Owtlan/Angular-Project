import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc, doc } from 'firebase/firestore'; 
import { Router } from '@angular/router'; 
import { Auth } from '@angular/fire/auth'
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'; 


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements AfterViewInit {
  @ViewChild('videoBackground') videoElement!: ElementRef;



  title: string = '';
  description: string = '';
  price: number = 0;
  category: string = '';
  imageFile: File | null = null; 
  imagePreview: string | null = null;

  constructor(private firestore: Firestore, private router: Router, private storage: Storage, private auth: Auth) { }

  ngAfterViewInit() {
    this.playVideo(); 
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

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.imageFile = target.files[0]; 

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result
      };
      reader.readAsDataURL(this.imageFile); 

    }
  }


  async addGame() {

    if (!this.imageFile) {
      console.error('No image file selected');
      return;
    }

    const user = this.auth.currentUser;
    if (!user) {
      console.error('No user logged in');
      return;
    }


    const gameData = {
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category,
      imageUrl: '',
      creatorId: user.uid,
      createdAt: new Date()
    };


    try {

      const storagePath = `images/${this.imageFile.name}`; 
      const storageRef = ref(this.storage, storagePath);
      await uploadBytes(storageRef, this.imageFile); 

      
      const imageUrl = await getDownloadURL(storageRef);
      gameData.imageUrl = imageUrl; 

      const gamesCollection = collection(this.firestore, 'games');

   
      const docRef = await addDoc(gamesCollection, gameData);
      console.log('Game added with ID: ', docRef.id); 

      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error adding game: ', error);
    }
  }
}

