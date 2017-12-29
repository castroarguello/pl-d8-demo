import { NgModule, Component, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule, Http, Response } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class DataService {
  private apiRoot: string = 'http://172.17.0.4/jsonapi/node/';

  constructor(private http: Http) {
  }

  private execRequest(endPoint: string, key: string): Promise<Object> {
    let promise = new Promise((resolve, reject) => {
      this.http.get(endPoint)
        .toPromise()
        .then(
        res => { // Success
          var response = res.json();
          this[key] = response;
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
    var node_fields = contentType +"?fields[node--" + contentType + "]=nid,title,body,status,promote";
    var filters = "&filter[status][value]=1&filter[promote][value]=1";
    var apiURL= this.apiRoot + node_fields + filters;
    // Execute request.
    return this.execRequest(apiURL, 'landingProductions');
  }

  
}
