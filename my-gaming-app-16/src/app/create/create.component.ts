import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc, doc } from 'firebase/firestore'; // Добавено е `doc` за работа с документите
import { Router } from '@angular/router'; // За навигиране към детайлите

import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'; // Импортиране на Firebase Storage


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements AfterViewInit {
  @ViewChild('videoBackground') videoElement!: ElementRef; // Декоратор за достъп до видеото



  title: string = '';
  description: string = '';
  price: number = 0;
  category: string = '';
  imageFile: File | null = null; // Променлива за съхранение на изображението
  imagePreview: string | null = null;

  constructor(private firestore: Firestore, private router: Router, private storage: Storage) { }

  ngAfterViewInit() {
    this.playVideo(); // Стартиране на видеото при инициализация на компонента
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
      this.imageFile = target.files[0]; // Запазваме избраното изображение

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result
      };
      reader.readAsDataURL(this.imageFile); // Четем файла като Data URL

    }
  }


  async addGame() {

    if (!this.imageFile) {
      console.error('No image file selected');
      return;
    }

    const gameData = {
      title: this.title,
      description: this.description,
      price: this.price,
      category: this.category,
      imageUrl: '',
    };


    try {
      // Качване на изображението в Firebase Storage
      const storagePath = `images/${this.imageFile.name}`; // Път за съхранение
      const storageRef = ref(this.storage, storagePath);
      await uploadBytes(storageRef, this.imageFile); // Качваме файла

      // Получаване на URL на каченото изображение
      const imageUrl = await getDownloadURL(storageRef);
      gameData.imageUrl = imageUrl; // Записваме URL адреса в данните за играта

      const gamesCollection = collection(this.firestore, 'games');

      // Добавяме играта в Firebase и получаваме ID на новия документ
      const docRef = await addDoc(gamesCollection, gameData);
      console.log('Game added with ID: ', docRef.id);  // Тук получаваш ID на играта

      // Навигиране към страницата с детайли за играта след успешно създаване
      this.router.navigate(['/', docRef.id]);
    } catch (error) {
      console.error('Error adding game: ', error);
    }
  }


}

