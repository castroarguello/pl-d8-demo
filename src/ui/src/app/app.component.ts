import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ArticleService]
})

export class AppComponent implements OnInit {
  title = 'D8 + Angular';
  articles: Object[];
  private loading: boolean = false;

  constructor(private articleService: ArticleService) { }

  getArticles(): void {
    this.loading = true;
    this.articleService.getNodes('article').then( () => this.loading = false);
  }

  ngOnInit(): void {
    this.getArticles();
  }
}
