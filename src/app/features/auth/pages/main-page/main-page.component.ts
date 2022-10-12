import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  audio = new Audio();
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.audio.src = '/assets/audio/dawn.mp3';
    this.audio.load();
    this.audio.play();
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
