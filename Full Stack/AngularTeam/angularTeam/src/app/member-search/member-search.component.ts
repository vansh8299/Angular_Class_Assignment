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
import { Member } from '../member/member';
import { MemberServiceService } from '../member-service.service';

@Component({
  selector: 'app-member-search',
  standalone: true,
  imports: [RouterModule, NgFor, AsyncPipe],
  templateUrl: './member-search.component.html',
  styleUrl: './member-search.component.css',
})
export class MemberSearchComponent {
  members$!: Observable<Member[]>;
  private searchTerms = new Subject<string>();

  constructor(private memberService: MemberServiceService) {}

  search(word: string): void {
    this.searchTerms.next(word);
  }
  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((word: string) => this.memberService.searchMembers(word))
    );
  }
}
