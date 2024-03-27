import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Observable,
  Subject,
  debounce,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

import { chardetailInter } from '../character-detail/chardetailInterface';
import { CharacterserviceService } from '../characterservice.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, NgFor, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  members$!: Observable<chardetailInter[]>;
  private searchTerms = new Subject<string>();

  constructor(private charService: CharacterserviceService) {}

  search(word: string): void {
    this.searchTerms.next(word);
  }
  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((word: string) => this.charService.searchchar(word))
    );
  }
}
