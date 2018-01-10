import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss']
})
export class ComposerComponent implements OnInit {
  Alias: string = '';
  private loading: boolean;

  constructor(private router: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.loading = true;
    this.router.params.subscribe(res => {
      this.Alias = res['pathAlias'];
      this.dataService.getComposerProductions(this.Alias).then(() => this.loading = false);
    });
  }

  routerCanReuse() {
    return false;
  }
}
