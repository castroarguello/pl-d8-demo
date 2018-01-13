import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService]
})

export class HomeComponent implements OnInit {
  title = '<small>-97db</small> <strong>Original Music</strong>';
  loading: boolean = false;
  loadingFeatured: boolean = false;
  constructor(private dataService: DataService) { }

  getProds(): void {
    this.loading = true;
    this.dataService.getLandingProductions().then( () => this.loading = false);
    this.loadingFeatured = true;
    this.dataService.getFeaturedMusic().then( () => this.loadingFeatured = false);
  }

  ngOnInit(): void {
    this.getProds();
  }
}
