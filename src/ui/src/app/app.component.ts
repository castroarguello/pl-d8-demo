import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { AudioPlayerService } from './services/audio/audio-player.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  brand = '97db Original Music';
  Url:SafeResourceUrl;
  constructor(private renderer: Renderer2, private player: AudioPlayerService, private san:DomSanitizer) {
    this.renderer.addClass(document.body, 'bg-dark');
    this.renderer.addClass(document.body, 'text-white');
  }
  ngOnInit(): void {
    //this.Iframe = this.san.bypassSecurityTrustHtml('<iframe class="embed-responsive-item" src="http://172.17.0.4/contact-us"></iframe>') ;
    this.Url = this.san.bypassSecurityTrustResourceUrl(environment.backendRoot + '/html/contact-us');
  }
}
