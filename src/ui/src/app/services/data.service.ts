import { NgModule, Component, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule, Http, Response } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class DataService {
  private backendRoot: string = 'http://172.17.0.4';
  private apiRoot: string = 'http://172.17.0.4/jsonapi/node/';
  Prods: Object[] = [];

  constructor(private http: Http) {
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
    var node_fields = contentType +"?fields[node--" + contentType + "]=nid,title,field_tracks,body";
    var relations = "&include=field_tracks,field_tracks.field_audio";
    var paragraph_fields = "&fields[paragraph--track]=field_audio,field_title&fields[file--file]=url";
    var apiURL= this.apiRoot + node_fields + relations + paragraph_fields;
    // Execute request.
    return this.execRequest(apiURL, contentType);
  }

  getLandingProductions(): Promise<Object> {
    // Build Jsonapi url.
    var contentType = 'produccion';
    var node_fields = contentType +"?fields[node--" + contentType + "]=nid,title,body";
    var filters = "&filter[status][value]=1&filter[promote][value]=1";
    var apiURL= this.apiRoot + node_fields + filters;
    // Execute request.
    return this.execRequest(apiURL, 'landingProductions');
  }

  getSingleProduction(id: string): Promise<Object> {
    // Build Jsonapi url.
    var contentType = 'produccion';
    var node_fields = "?fields[node--" + contentType + "]=nid,field_tracks,field_img_p";
    var relations = "&include=field_tracks,field_tracks.field_audio,field_img_p";
    var paragraph_fields = "&fields[paragraph--track]=field_audio,field_title&fields[file--file]=url,filemime";
    var apiURL= this.apiRoot + contentType + "/" + id + node_fields + relations + paragraph_fields;
    // Execute request.
    ;
    let promise = new Promise((resolve, reject) => {
      this.execRequest(apiURL, ['Prods', id])
        .then(
        res => { // Success
          this.Prods[id].tracks = [];
          let i = -1;
          this.Prods[id].included.forEach( (element) => {
              if (element.type !== 'file--file') {
                i= i +1;
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


}
