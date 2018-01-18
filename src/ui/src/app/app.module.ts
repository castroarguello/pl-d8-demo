import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HttpModule} from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AudioPlayerService } from './services/audio/audio-player.service';
import { DataService } from './services/data.service';
import { TrackComponent } from './components/track/track.component';
import { ProductionComponent } from './components/production/production.component';
import { ComposerComponent } from './components/composer/composer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'composer/:pathAlias', component: ComposerComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    TrackComponent,
    ProductionComponent,
    ComposerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [DataService, AudioPlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
