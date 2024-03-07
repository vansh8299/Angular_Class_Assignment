import { Injectable } from '@angular/core';
import { Member } from './member/member';
import { MEMBERS } from './my-member';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberServiceService {
  constructor() {}

  getMembers(): Observable<Member[]> {
    return of(MEMBERS);
  }
}
