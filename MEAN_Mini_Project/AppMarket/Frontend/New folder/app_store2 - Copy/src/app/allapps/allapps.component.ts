import { Component } from '@angular/core';
import { AppInterface } from '../appinterface';
import { AppserviceService } from '../appservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-allapps',
  standalone: true,
  imports: [NgFor, RouterModule, NgbRatingModule],
  templateUrl: './allapps.component.html',
  styleUrl: './allapps.component.css',
})
export class AllappsComponent {
  apps: AppInterface[] = [];

  constructor(private appService: AppserviceService, config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getapp();
  }

  getapp(): void {
    this.appService.getapp().subscribe((app) => (this.apps = app));
  }
}
