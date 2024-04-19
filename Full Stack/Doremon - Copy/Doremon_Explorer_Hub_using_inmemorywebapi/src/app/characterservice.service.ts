import { Injectable } from '@angular/core';

import { Observable, catchError, of, tap } from 'rxjs';
import { MessageserviceService } from './messageservice.service';

import { chardetailInter } from './character-detail/chardetailInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharacterserviceService {
  private characterUrl = 'api/characters';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageServices: MessageserviceService
  ) {}
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageServices.add(`Chararter Service: ${message}`);
  }

  getChar(): Observable<chardetailInter[]> {
    return this.http.get<chardetailInter[]>(this.characterUrl).pipe(
      tap((_) => this.log('Fetched Character')),

      catchError(this.handleError<chardetailInter[]>('getChar', []))
    );
  }
  getChardetail(id1: number): Observable<chardetailInter> {
    const url = `${this.characterUrl}/${id1}`;
    return this.http.get<chardetailInter>(url).pipe(
      tap((_) => this.log(`Charater Fetched id = ${id1}`)),
      catchError(this.handleError<chardetailInter>(`getChardetail id=${id1}`))
    );
  }
  updatecharacter(char: chardetailInter): Observable<any> {
    return this.http.put(this.characterUrl, char, this.httpOptions).pipe(
      tap((_) => this.log('Updated Character')),
      catchError(this.handleError<chardetailInter>('updatechar character'))
    );
  }
  addchar(char: chardetailInter): Observable<chardetailInter> {
    return this.http
      .post<chardetailInter>(this.characterUrl, char, this.httpOptions)
      .pipe(
        tap((newchar: chardetailInter) =>
          this.log(`added character with id=${newchar.id}`)
        ),
        catchError(this.handleError<chardetailInter>('addMember'))
      );
  }
  deletechar(id: number): Observable<chardetailInter> {
    const url = `${this.characterUrl}/${id}`;
    return this.http.delete<chardetailInter>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Deleted Character id=${id}`)),
      catchError(this.handleError<chardetailInter>('deleteMember'))
    );
  }
  searchchar(word: string): Observable<chardetailInter[]> {
    if (!word.trim()) {
      return of([]);
    }
    return this.http
      .get<chardetailInter[]>(`${this.characterUrl}/?name=${word}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`Found members matching ${word}`)
            : this.log(`No members matching ${word}`)
        ),
        catchError(this.handleError<chardetailInter[]>('searchMembers', []))
      );
  }
}
