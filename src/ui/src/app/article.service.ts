import { NgModule, Component, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Article } from './article';


@Injectable()
export class ArticleService {
  apiRoot: string = 'http://172.17.0.4/jsonapi/node/';
  results: Object[];
  loading: boolean;

  constructor(private http: Http) {
    this.results = [];
    this.loading = false;
  }

  getNodes(contentType: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = this.apiRoot + contentType;
      this.http.get(apiURL)
        .toPromise()
        .then(
        res => { // Success
          this.results = res.json().data;
          //console.log(this.results);
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
