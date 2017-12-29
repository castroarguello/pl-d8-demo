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
  title = '-97db <strong>Original Music</strong>';
  private loading: boolean = false;

  constructor(private dataService: DataService) { }

  getProds(): void {
    this.loading = true;
    this.dataService.getLandingProductions().then( () => this.loading = false);
  }

  ngOnInit(): void {
    this.getProds();
  }
}
