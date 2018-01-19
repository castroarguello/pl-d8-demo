import { NgModule, Component, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
  private backendRoot: string = '';
  private apiRoot: string = '';
  Prods: Object[] = [];
  Composers: Object[] = [];
  featuredMusic: any;

  constructor(private http: Http, private san:DomSanitizer) {
    this.backendRoot = environment.backendRoot;
    this.apiRoot = environment.apiRoot;
    this.Composers['german-martin'] = {nid: '1'};
    this.Composers['gerardo-colinas'] = {nid: '3'};
  }

  private execRequest(endPoint: string, key: any): Promise<Object> {
    let promise = new Promise((resolve, reject) => {
      this.http.get(endPoint)
        .toPromise()
        .then(
        res => { // Success
          let response = res.json();
          if (typeof key == 'string') {
            this[key] = response;
          }
          if (typeof key == 'object') {
            if (key[0] == 'Prods') {
              this.Prods[key[1]] = response;
            }
          }
          resolve();
        },
        msg => { // Error
          reject(msg);
        }
        );
    });
    return promise;
  }

  getNodes(contentType: string): Promise<Object> {
    // Build Jsonapi url.
    var node_fields = contentType + "?fields[node--" + contentType + "]=nid,title,body";
    var apiURL = this.apiRoot + node_fields;
    // Execute request.
    return this.execRequest(apiURL, contentType);
  }

  getLandingProductions(): Promise<Object> {
    // Build Jsonapi url.
    var contentType = 'produccion';
    var node_fields = contentType + "?fields[node--" + contentType + "]=nid,title,body,field_format,field_inst";
    var filters = "&filter[status][value]=1&filter[promote][value]=1$filter[sticky][value]=0&sort=-created";
    var apiURL = this.apiRoot + node_fields + filters;
    // Execute request.
    return this.execRequest(apiURL, 'landingProductions');
  }

  getComposerProductions(composerAlias: string): Promise<Object> {
    // Build Jsonapi url.
    let composerId = this.Composers[composerAlias].nid;
    var contentType = 'produccion';
    var node_fields = contentType + "?fields[node--" + contentType + "]=nid,field_compositor,title,body,field_format,field_inst";
    var filters = "&filter[status][value]=1&filter[promote][value]=1$filter[sticky][value]=0";
    var relations = "&include=field_compositor";
    var composerfilters = "&filter[field_compositor.nid][value]=" + composerId + "&sort=-created";
    var apiURL = this.apiRoot + node_fields + relations + filters + composerfilters;
    let promise = new Promise((resolve, reject) => {
      // Execute request.
      this.execRequest(apiURL, composerAlias).then(
        res => {
          this[composerAlias].included.forEach((composer) => {
            if (composerId == composer.attributes.nid) {
              this.Composers[composerAlias].name = composer.attributes.title;
              if (composer.attributes.body != null) {
                this.Composers[composerAlias].bio = composer.attributes.body.value;
              }
            }
          }
        );
          resolve();
        },
        msg => { // Error
          reject(msg);
        }
      );
    });
    return promise;
  }

getSingleProduction(id: string): Promise < Object > {
  // Build Jsonapi url.
  var contentType = 'produccion';
  var node_fields = "?fields[node--" + contentType + "]=nid,field_tracks,field_img_p";
  var relations = "&include=field_tracks,field_tracks.field_audio,field_img_p";
  var paragraph_fields = "&fields[paragraph--track]=field_audio,field_title&fields[file--file]=url,filemime";
  var apiURL = this.apiRoot + contentType + "/" + id + node_fields + relations + paragraph_fields;
  // Execute request.
  let promise = new Promise((resolve, reject) => {
    this.execRequest(apiURL, ['Prods', id])
      .then(
      res => { // Success
        this.Prods[id].tracks = [];
        let i = -1;
        this.Prods[id].included.forEach((element) => {
          if (element.type !== 'file--file') {
            i = i + 1;
            this.Prods[id].tracks[i] = element.attributes;
            this.Prods[id].tracks[i].url = '';
            this.Prods[id].tracks[i].class = 'small text-light';
            if (element.relationships && element.relationships.field_audio.data !== null) {
              let audioId = element.relationships.field_audio.data.id;
              let audio = this.Prods[id].included.find(o => o.id === audioId);
              if (audio) {
                this.Prods[id].tracks[i].url = this.backendRoot + audio.attributes.url;
                this.Prods[id].tracks[i].class = 'text-white';
              }
            }
          }
          else {
            if (element.attributes.filemime.substr(0, 5) == 'image') {
              this.Prods[id].image = this.backendRoot + element.attributes.url;
            }
          }
        });
        resolve();
      },
      msg => { // Error
        reject(msg);
      }
      );
  });
  return promise;
}

getFeaturedMusic(): Promise < Object > {
  // Build Jsonapi url.
  var contentType = 'produccion';
  var node_fields = contentType + "?fields[node--" + contentType + "]=nid,title,field_format,field_inst,field_tracks,field_img_p";
  var relations = "&include=field_tracks,field_tracks.field_audio,field_img_p";
  var paragraph_fields = "&fields[paragraph--track]=field_audio,field_title&fields[file--file]=url,filemime";
  var filters = "&filter[status][value]=1&filter[promote][value]=0&filter[sticky][value]=1&sort=-created";
  var noemptyfilters = "&filter[audio-filter][condition][path]=field_tracks.field_audio&filter[audio-filter][condition][operator]=IS NOT NULL";
  var apiURL = this.apiRoot + node_fields + relations + paragraph_fields + noemptyfilters + filters;
  let promise = new Promise((resolve, reject) => {
    this.execRequest(apiURL, 'featuredMusic')
      .then(
      res => { // Success
        this.featuredMusic.prods = [];
        let i = -1;
        // Iterates productions.
        this.featuredMusic.data.forEach((singleprod) => {
          i = i + 1;
          this.featuredMusic.prods[i] = singleprod.attributes;
          this.featuredMusic.prods[i].tracks = [];
          // Add image.
          if (singleprod.relationships.field_img_p.data !== null) {
            let imageContent = this.featuredMusic.included.find(o => o.id === singleprod.relationships.field_img_p.data.id);
            this.featuredMusic.prods[i].image = this.backendRoot + imageContent.attributes.url;
          }
          // Iterates tracks.
          let j = -1;
          singleprod.relationships.field_tracks.data.forEach((track) => {
            let trackContent = this.featuredMusic.included.find(o => o.id === track.id);
            if (trackContent.relationships && trackContent.relationships.field_audio.data !== null) {
              let audioId = trackContent.relationships.field_audio.data.id;
              let audioContent = this.featuredMusic.included.find(o => o.id === audioId);
              // Only save tracks with audio.
              if (audioContent) {
                j = j + 1;
                this.featuredMusic.prods[i].tracks[j] = trackContent.attributes;
                this.featuredMusic.prods[i].tracks[j].url = this.backendRoot + audioContent.attributes.url;
                this.featuredMusic.prods[i].tracks[j].class = 'text-white';
              }
            }
          });
        });
        resolve();
      },
      msg => { // Error
        reject(msg);
      }
      );
  });
  // Execute request.
  return promise;
}

}
