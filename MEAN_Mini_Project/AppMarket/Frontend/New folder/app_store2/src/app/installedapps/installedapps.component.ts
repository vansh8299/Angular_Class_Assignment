import { Component } from '@angular/core';
import { AppInterface } from '../appinterface';
import { AppserviceService } from '../appservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-installedapps',
  standalone: true,
  imports: [NgFor, RouterModule, NgbRatingModule],
  templateUrl: './installedapps.component.html',
  styleUrl: './installedapps.component.css',
})
export class InstalledappsComponent {
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
