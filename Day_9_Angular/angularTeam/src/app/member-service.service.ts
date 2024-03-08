import { Injectable } from '@angular/core';
import { Member } from './member/member';
import { MEMBERS } from './my-member';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MemberServiceService {
  constructor(private messageServices: MessageService) {}

  getMembers(): Observable<Member[]> {
    const members = of(MEMBERS);
    this.messageServices.add('MemberService: Members got fetched.....');
    return members;
  }
}
