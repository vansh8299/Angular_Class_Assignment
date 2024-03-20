import { Injectable } from '@angular/core';
import { Member } from './member/member';
import { MEMBERS } from './my-member';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageServices.add(`MemberService: ${message}`);
  }
  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersURL).pipe(
      tap((_) => this.log('fetched Members')),
      catchError(this.handleError<Member[]>('getMembers', []))
    );
  }

  getMember(id: number): Observable<Member> {
    const url = `${this.membersURL}/${id}`;
    return this.http.get<Member>(url).pipe(
      tap((_) => this.log(`fetched member id=${id}`)),
      catchError(this.handleError<Member>('getMember id=${id}'))
    );
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersURL, member, this.httpOptions).pipe(
      tap((_) => this.log('Updated member id=${member.id}')),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  addMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(this.membersURL, member, this.httpOptions)
      .pipe(
        tap((newMember: Member) =>
          this.log(`added member with id=${newMember.id}`)
        ),
        catchError(this.handleError<Member>('addMember'))
      );
  }

  deleteMember(id: number): Observable<Member> {
    const url = `${this.membersURL}/${id}`;
    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Deleted Member id=${id}`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }

  searchMembers(word: string): Observable<Member[]> {
    if (!word.trim()) {
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersURL}/?name=${word}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`Found members matching ${word}`)
          : this.log(`No members matching ${word}`)
      ),
      catchError(this.handleError<Member[]>('searchMembers', []))
    );
  }
}
