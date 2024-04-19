import { Component } from '@angular/core';
import { gadgetdetailinter } from '../gadget-detail/gadgetdetailinter';
import { AsyncPipe, NgFor } from '@angular/common';

import { RouterModule } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { GadgetserviceService } from '../gadgetservice.service';

@Component({
  selector: 'app-gadget-search',
  standalone: true,
  imports: [RouterModule, AsyncPipe, NgFor],
  templateUrl: './gadget-search.component.html',
  styleUrl: './gadget-search.component.css',
})
export class GadgetSearchComponent {
  gadgets$!: Observable<gadgetdetailinter[]>;
  private searchTerms = new Subject<string>();

  constructor(private gadService: GadgetserviceService) {}

  search(word: string): void {
    this.searchTerms.next(word);
  }
  ngOnInit(): void {
    this.gadgets$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((word: string) => this.gadService.searchgad(word))
    );
  }
}
