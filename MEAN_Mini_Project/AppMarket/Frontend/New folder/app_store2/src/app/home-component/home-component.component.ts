import { Component } from '@angular/core';
import { AppInterface } from '../appinterface';
import { AppserviceService } from '../appservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [NgFor, RouterModule, NgbRatingModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
  providers: [NgbRatingConfig],
})
export class HomeComponentComponent {
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
  delete(app: AppInterface): void {
    if (app.id !== undefined) {
      this.apps = this.apps.filter((ann) => ann !== app);
      this.appService.deleteapp(app.id).subscribe();
    }
  }
}
