import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Member } from './member/member';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class MemberServiceService {
  private membersURL = 'http://localhost:3000/member';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`MemberService: ${message}`);
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
      catchError(this.handleError<Member>(`getMember id=${id}`))
    );
  }

  updateMember(member: Member): Observable<any> {
    const url = `${this.membersURL}/${member.member_id}`;
    return this.http.put(url, member, this.httpOptions).pipe(
      tap((_) => this.log(`updated member id=${member.member_id}`)),
      catchError(this.handleError<any>('updateMember'))
    );
  }

  addMember(member: Member): Observable<Member> {
    return this.http
      .post<Member>(this.membersURL, member, this.httpOptions)
      .pipe(
        tap((newMember: Member) =>
          this.log(`added member with id=${newMember.member_id}`)
        ),
        catchError(this.handleError<Member>('addMember'))
      );
  }

  deleteMember(id: number): Observable<Member> {
    const url = `${this.membersURL}/${id}`;
    return this.http.delete<Member>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted member id=${id}`)),
      catchError(this.handleError<Member>('deleteMember'))
    );
  }

  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    console.log(term);
    return this.http
      .get<Member[]>(`${this.membersURL}/search?term=${term}`)
      .pipe(
        tap((_) => this.log(`searching data for ${term}`)),
        catchError(this.handleError<any>('searchdata', []))
      );
  }
}
