import { Component, OnInit, Input } from '@angular/core';
import { AudioPlayerService } from '../../services/audio/audio-player.service';
import { Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface TrackObject{
    url: SafeResourceUrl;
    field_title: string;
}

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input() Track: TrackObject;
  @Input() isHome: boolean;
  cClass: string = '';

  constructor(private player: AudioPlayerService, private renderer: Renderer2) {
  }

  playTrack(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    this.player.play(this.Track.url, this.Track.field_title, target, this.renderer);
  }

  ngOnInit() {
  }

}
