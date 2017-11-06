import { Injectable } from '@angular/core';
import { Article } from './article';

export const ARTICLES: Article[] = [
  { id: 11, title: 'Mr. Nice' },
  { id: 12, title: 'Narco' },
  { id: 13, title: 'Bombasto' },
  { id: 14, title: 'Celeritas' },
  { id: 15, title: 'Magneta' },
  { id: 16, title: 'RubberMan' },
  { id: 17, title: 'Dynama' },
  { id: 18, title: 'Dr IQ' },
  { id: 19, title: 'Magma' },
  { id: 20, title: 'Tornado' }
];

@Injectable()
export class ArticleService {
  // getArticles(): Promise<Article[]> {
  //   return Promise.resolve(ARTICLES);
  // }
  getArticles(): Article[] {
    return ARTICLES;
  }
}
