import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable()
export class AudioPlayerService {
  public Tracks: Howl[] = [];
  public Track: Howl = null;
  public Title: string;

  constructor() { }

  play(audioUrl: string, trackTitle: string) {
    if (this.Track && this.Track.playing()) {
      this.Track.stop();
    }
    if (this.Tracks[audioUrl]) {
      this.Track = this.Tracks[audioUrl];
    }
    else {
      this.Track = new Howl({
        src: [audioUrl],
        html5 :true
      });
      this.Tracks[audioUrl] = this.Track;
    }
    this.Title = trackTitle;
    this.Track.play();
  }

}
