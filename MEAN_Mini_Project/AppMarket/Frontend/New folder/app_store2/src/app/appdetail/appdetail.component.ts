import { Component, OnInit } from '@angular/core';
import { Location, NgFor, NgIf } from '@angular/common';
import { AppInterface } from '../appinterface';
import { AppserviceService } from '../appservice.service';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { commentInterface } from '../commentInterface';

@Component({
  selector: 'app-appdetail',
  standalone: true,
  imports: [NgFor, NgIf, NgbRatingModule, NgbCarouselModule],
  templateUrl: './appdetail.component.html',
  styleUrls: ['./appdetail.component.css'],
})
export class AppdetailComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  appdetail?: AppInterface;

  constructor(
    private appService: AppserviceService,
    private route: ActivatedRoute,
    private location: Location,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getappdetail();
  }

  getappdetail(): void {
    const id1 = Number(this.route.snapshot.paramMap.get('id'));
    this.appService
      .getappdetail(id1)
      .subscribe((app) => (this.appdetail = app));
  }

  goback(): void {
    this.location.back();
  }
}
