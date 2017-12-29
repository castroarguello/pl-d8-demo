import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
  providers: [DataService]
})
export class ProductionComponent implements OnInit {
  @Input() Id: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {

  }

}
