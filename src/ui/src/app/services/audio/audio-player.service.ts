import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Renderer2 } from '@angular/core';

@Injectable()
export class AudioPlayerService {
  public Tracks: Howl[] = [];
  public Track: Howl = null;
  public Title: string;
  public Target: any;
  public Url: string;
  private renderer: Renderer2;

  constructor() {
  }

  play(audioUrl: string, trackTitle: string, domTarget: any, renderer: Renderer2) {

    // Replay the last track.
    if (this.Url == audioUrl) {
      if (!this.Track.playing()) {
        this.startTrack();
      }
      else {
        this.stopTrack();
      }
      return;
    }

    this.renderer = renderer;
    if (this.Track && this.Track.playing()) {
      this.stopTrack();
    }
    if (this.Tracks[audioUrl]) {
      this.Track = this.Tracks[audioUrl];
    }
    else {
      this.Track = new Howl({
        src: [audioUrl],
        html5: true
      });
      this.Track.on('end', () => {
        this.stopTrack();
      });
      this.Tracks[audioUrl] = this.Track;
    }
    this.Title = trackTitle;
    this.Target = domTarget;
    this.Url = audioUrl;
    this.startTrack();
  }

  stopTrack() {
    let target = this.Target;
    this.renderer.removeClass(target, 'faa-pulse');
    this.renderer.removeClass(target, 'animated');
    let parent = this.renderer.parentNode(this.renderer.parentNode(target));
    this.renderer.removeClass(parent, 'bg-dark');
    this.renderer.removeClass(parent, 'br-5');
    this.renderer.addClass(target, 'animated-hover');
    this.renderer.addClass(target, 'faa-tada');
    this.Track.stop();
  }

  startTrack() {
    let target = this.Target;
    this.renderer.removeClass(target, 'animated-hover');
    this.renderer.removeClass(target, 'faa-tada');
    let parent = this.renderer.parentNode(this.renderer.parentNode(target));
    this.renderer.addClass(parent, 'bg-dark');
    this.renderer.addClass(parent, 'br-5');
    this.renderer.addClass(target, 'faa-pulse');
    this.renderer.addClass(target, 'animated');
    this.Track.play();
  }

}
