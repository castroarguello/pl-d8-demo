import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
  providers: [DataService]
})
export class ProductionComponent implements OnInit {
  @Input() Prod: Object;
  @Input() Id: string;
  loading: boolean = true;
  Tracks: Object[];
  Image: string;


constructor(private dataService: DataService) { }

ngOnInit() {
  this.loading = true;
  this.dataService.getSingleProduction(this.Id).then(() => {
    this.Tracks = this.dataService.Prods[this.Id].tracks;
    this.Image = this.dataService.Prods[this.Id].image;
    this.loading = false;
    }
  );
}

}
