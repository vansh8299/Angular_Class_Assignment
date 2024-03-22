import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { NEWS } from '../newsInterface';
import { NewsService } from '../news.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-newssearch',
  standalone: true,
  imports: [AsyncPipe, NgFor, FormsModule, RouterModule],
  templateUrl: './newssearch.component.html',
  styleUrl: './newssearch.component.css',
})
export class NewssearchComponent {
  news$!: Observable<NEWS[]>;
  private searchnews = new Subject<string>();

  constructor(private newsService: NewsService) {}

  search(word: string): void {
    this.searchnews.next(word);
  }

  ngOnInit(): void {
    this.news$ = this.searchnews.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((word: string) => this.newsService.searchNews(word))
    );
  }
}
