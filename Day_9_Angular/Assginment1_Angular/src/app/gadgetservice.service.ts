import { Injectable } from '@angular/core';

import { Observable, catchError, of, tap } from 'rxjs';
import { MessageserviceService } from './messageservice.service';

import { gadgetdetailinter } from './gadget-detail/gadgetdetailinter';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GadgetserviceService {
  private gadgetUrl = 'api/gadgets';

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
    this.messageServices.add(`Gadget Service: ${message}`);
  }
  getGad(): Observable<gadgetdetailinter[]> {
    return this.http.get<gadgetdetailinter[]>(this.gadgetUrl).pipe(
      tap((_) => this.log('Gadgets Fetched')),
      catchError(this.handleError<gadgetdetailinter[]>('getGad', []))
    );
  }
  getGaddetail(id1: number): Observable<gadgetdetailinter> {
    const url = `${this.gadgetUrl}/${id1}`;
    return this.http.get<gadgetdetailinter>(url).pipe(
      tap((_) => this.log(`Gadget Fetched: ${id1}`)),
      catchError(this.handleError<gadgetdetailinter>(`getGaddetail ${id1}`))
    );
  }
  updategadget(gadget: gadgetdetailinter): Observable<any> {
    return this.http.put(this.gadgetUrl, gadget, this.httpOptions).pipe(
      tap((_) => this.log('Updated Gadget')),
      catchError(this.handleError<gadgetdetailinter>('updategadget gadget'))
    );
  }

  addGad(gad: gadgetdetailinter): Observable<gadgetdetailinter> {
    return this.http
      .post<gadgetdetailinter>(this.gadgetUrl, gad, this.httpOptions)
      .pipe(
        tap((newMember: gadgetdetailinter) =>
          this.log(`added gadget with id=${newMember.id}`)
        ),
        catchError(this.handleError<gadgetdetailinter>('addMember'))
      );
  }
  deleteGad(id: number): Observable<gadgetdetailinter> {
    const url = `${this.gadgetUrl}/${id}`;
    return this.http.delete<gadgetdetailinter>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Deleted Gadgets id=${id}`)),
      catchError(this.handleError<gadgetdetailinter>('deleteMember'))
    );
  }
  searchgad(word: string): Observable<gadgetdetailinter[]> {
    if (!word.trim()) {
      return of([]);
    }
    return this.http
      .get<gadgetdetailinter[]>(`${this.gadgetUrl}/?name=${word}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`Found members matching ${word}`)
            : this.log(`No members matching ${word}`)
        ),
        catchError(this.handleError<gadgetdetailinter[]>('searchMembers', []))
      );
  }
}
