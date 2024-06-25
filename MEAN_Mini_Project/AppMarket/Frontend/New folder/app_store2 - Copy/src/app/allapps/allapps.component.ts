import { Component } from '@angular/core';
import { AppInterface } from '../appinterface';
import { AppserviceService } from '../appservice.service';
import { NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { InstallappServiceService } from '../installapp-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-allapps',
  standalone: true,
  imports: [NgFor, RouterModule, NgbRatingModule, FormsModule],
  templateUrl: './allapps.component.html',
  styleUrl: './allapps.component.css',
})
export class AllappsComponent {
  apps: AppInterface[] = [];

  constructor(
    private appService: AppserviceService,
    config: NgbRatingConfig,
    private installService: InstallappServiceService,
    private router: Router
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getapp();
  }

  getapp(): void {
    this.appService.getapp().subscribe((app) => (this.apps = app));
  }
  addDownload(appId: string | undefined): void {
    if (appId) {
      console.log(appId);
      this.installService.addapptoinstall(appId).subscribe(
        () => {},
        (error) => {
          console.error('Error adding download', error);
        }
      );
    } else {
      console.error('App ID is undefined');
    }
  }
}
