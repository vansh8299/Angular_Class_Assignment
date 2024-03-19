import { Injectable } from '@angular/core';
import { Member } from './member/member';
import { MEMBERS } from './my-member';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemberServiceService {
  private membersURL = 'api/members';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageServices: MessageService
  ) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersURL);
  }

  getMember(id: number): Observable<Member> {
    const url = `${this.membersURL}/${id}`;
    return this.http.get<Member>(url);
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersURL, member, this.httpOptions);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersURL, member, this.httpOptions);
  }

  deleteMember(id: number): Observable<Member> {
    const url = `${this.membersURL}/${id}`;
    return this.http.delete<Member>(url, this.httpOptions);
  }
}
