import { Component } from '@angular/core';
import { NewsdataserviceService } from '../newsdataservice.service';
import { ActivatedRoute } from '@angular/router';
import { NEWS } from '../newsInterface';
import { NewsService } from '../news.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newsdetail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './newsdetail.component.html',
  styleUrl: './newsdetail.component.css',
})
export class NewsdetailComponent {
  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  newsss?: NEWS;

  ngOnInit(): void {
    this.getOneNews();
  }

  getOneNews(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getOnenews(id).subscribe((n) => {
      this.newsss = n;
    });
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.newsss) {
      this.newsService.updateNews(this.newsss).subscribe(() => this.goBack());
    }
  }
}
