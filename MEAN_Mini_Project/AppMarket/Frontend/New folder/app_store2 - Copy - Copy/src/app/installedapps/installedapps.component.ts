import { ChangeDetectorRef, Component } from '@angular/core';
import { AppInterface } from '../appinterface';
import { Location, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { InstallappServiceService } from '../installapp-service.service';
import { AppserviceService } from '../appservice.service';
import { NgIf } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-installedapps',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, NgbAlertModule, NgbRatingModule],
  templateUrl: './installedapps.component.html',
  styleUrls: ['./installedapps.component.css'], // Fixed typo
})
export class InstalledappsComponent {
  downloadeddata: AppInterface[] = [];
  printerror: string = '';

  constructor(
    private installservice: InstallappServiceService,
    private router: Router,
    private appService: AppserviceService,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) {}

  ngOnInit() {
    this.getdownloads();
    console.log(this.downloadeddata);
  }

  getdownloads() {
    this.installservice.getdownload().subscribe((app) => {
      app.forEach((a) => {
        this.appService.getappdetail(a).subscribe({
          next: (application) => {
            if (application !== undefined) {
              this.downloadeddata.push(application);
            }
          },
        });
      });

      console.log(this.downloadeddata);
    });
  }

  delete(a: AppInterface) {
    if (a.id !== undefined) {
      this.installservice.deletedownload(a.id.toString()).subscribe({
        next: (m) => {
          if (m) {
            this.downloadeddata = this.downloadeddata.filter(
              (app) => app.id !== a.id
            );
            console.log(this.downloadeddata);
          }
          this.printerror = '';
        },
        error: (error) => {
          this.printerror = error.error.message;
          this.cdr.detectChanges();
          console.log(this.printerror);
        },
      });
    } else {
      this.printerror = 'App ID is undefined';
      console.log(this.printerror);
    }
  }

  goback() {
    this.location.back();
  }
}
