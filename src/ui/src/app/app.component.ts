import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ArticleService]
}

export class AppComponent implements OnInit {
  title = 'D8 + Angular';
  articles: Article[];

  constructor(private articleService: ArticleService) { }

  getArticles(): void {
    this.articles = this.articleService.getArticles();
    //.then(articles => this.articles = articles);
  }

  ngOnInit(): void {
    this.getArticles();
    this.title = 'Test';
  }
}
