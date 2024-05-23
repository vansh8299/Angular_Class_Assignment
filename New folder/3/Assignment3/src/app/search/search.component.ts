import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Interface } from '../announcement/interface';
import { AnnouncementService } from '../announcement.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, AsyncPipe, NgFor],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  announcements$!: Observable<Interface[]>;
  private searchTerms = new Subject<string>();

  constructor(private announcementService: AnnouncementService) {}

  search(word: string): void {
    this.searchTerms.next(word);
  }

  ngOnInit(): void {
    this.announcements$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((word: string) => this.announcementService.search(word))
    );
  }
}
