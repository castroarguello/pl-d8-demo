import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { AudioPlayerService } from './services/audio/audio-player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  brand = '97db Original Music';

  constructor(private renderer: Renderer2, private player: AudioPlayerService) {
    this.renderer.addClass(document.body, 'bg-dark');
    this.renderer.addClass(document.body, 'text-white');
  }

  ngOnInit(): void {
  }
}
