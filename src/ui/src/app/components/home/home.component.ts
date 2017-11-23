import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ArticleService]
})

export class HomeComponent implements OnInit {
  title = 'D8 + Angular';
  articles: Object[];
  private loading: boolean = false;

  constructor(private articleService: ArticleService, public router: Router) { }

  getArticles(): void {
    this.loading = true;
    this.articleService.getNodes('article').then( () => this.loading = false);
  }

  ngOnInit(): void {
    this.getArticles();
  }
}
