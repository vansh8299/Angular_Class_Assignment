import { Component } from '@angular/core';
import { NEWS } from '../newsInterface';
import { NewsService } from '../news.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
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
}
