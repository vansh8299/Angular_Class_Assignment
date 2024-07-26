import { Component } from '@angular/core';
import { appInterface } from '../appinterface';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { ApplicationsService } from '../../core/services/applications.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  apps!: Observable<appInterface[]>;
  private searchTerms = new Subject<string>();

  constructor(private appService: ApplicationsService) {}

  search(word: string): void {
    this.searchTerms.next(word);
  }
  ngOnInit(): void {
    this.apps = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((word: string) => this.appService.search(word))
    );
  }
}
