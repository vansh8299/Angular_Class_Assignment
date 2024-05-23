import { Injectable } from '@angular/core';

import { Observable, catchError, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Interface } from './announcement/interface';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private announcementsUrl = 'http://localhost:3000/announcements';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  getAnnouncements(): Observable<Interface[]> {
    return this.http
      .get<Interface[]>(this.announcementsUrl)
      .pipe(catchError(this.handleError<Interface[]>('getAnnouncements', [])));
  }
  getAnnouncementById(id: number): Observable<Interface> {
    const url = `${this.announcementsUrl}/${id}`;
    return this.http
      .get<Interface>(url)
      .pipe(
        catchError(this.handleError<Interface>(`getAnnouncementById id=${id}`))
      );
  }

  addAnnouncements(announcements: Interface): Observable<Interface> {
    return this.http
      .post<Interface>(this.announcementsUrl, announcements, this.httpOptions)
      .pipe(catchError(this.handleError<Interface>('addAnnouncements')));
  }
  updateAnnouncements(announcement: Interface): Observable<Interface> {
    const url = `${this.announcementsUrl}/${announcement.id}`;
    return this.http
      .put<Interface>(url, announcement, this.httpOptions)
      .pipe(catchError(this.handleError<Interface>('updateAnnouncements')));
  }
  deleteAnnouncements(id: number): Observable<Interface> {
    const url = `${this.announcementsUrl}/${id}`;
    return this.http
      .delete<Interface>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Interface>('deleteAnnouncements')));
  }
  search(word: string): Observable<Interface[]> {
    if (!word.trim()) {
      return of([]);
    }
    return this.http
      .get<Interface[]>(`${this.announcementsUrl}/?title=${word}`)
      .pipe(catchError(this.handleError<Interface[]>('search', [])));
  }
}
