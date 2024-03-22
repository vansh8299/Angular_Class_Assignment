import { Component } from '@angular/core';
import { NEWS } from '../newsInterface';
import { NewsService } from '../news.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { NewssearchComponent } from '../newssearch/newssearch.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterModule, NgFor, NewssearchComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  news: NEWS[] = [];
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getnews();
  }
  getnews(): void {
    this.newsService.getNews().subscribe((news) => (this.news = news));
  }

  delete(deletenews: NEWS): void {
    this.news = this.news.filter((m) => m != deletenews);
    this.newsService.deleteNews(deletenews.id).subscribe();
  }
  add(title: string): void {
    title = title.trim();
    if (!title) {
      return;
    }
    this.newsService
      .addNews({ title } as NEWS)
      .subscribe((n) => this.news.push(n));
  }
}
