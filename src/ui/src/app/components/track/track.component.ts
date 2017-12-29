import { Component, OnInit, Input } from '@angular/core';
import { AudioPlayerService } from '../../services/audio/audio-player.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input() Title: string;
  @Input() Url: string;
  constructor(private player: AudioPlayerService) {
  }

  ngOnInit() {
  }

}
