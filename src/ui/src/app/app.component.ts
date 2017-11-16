import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ArticleService } from './article.service';
import { Article } from './article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ArticleService]
})

export class AppComponent implements OnInit {
  title = 'D8 + Angular';
  articles: Object[];
  private loading: boolean = false;

  constructor(private articleService: ArticleService, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'bg-dark');
    this.renderer.addClass(document.body, 'text-white');
  }

  getArticles(): void {
    this.loading = true;
    this.articleService.getNodes('article').then( () => this.loading = false);
  }

  ngOnInit(): void {
    this.getArticles();
  }
}
