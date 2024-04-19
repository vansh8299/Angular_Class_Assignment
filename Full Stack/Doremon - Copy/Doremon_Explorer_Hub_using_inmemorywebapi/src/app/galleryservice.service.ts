import { Injectable } from '@angular/core';
import { MessageserviceService } from './messageservice.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { galleryInter } from './gallery/galleryInter';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GalleryserviceService {
  private url = 'api/gallery';
  constructor(
    private messageService: MessageserviceService,
    private http: HttpClient
  ) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Gallery Service: ${message}`);
  }
  getGallery(): Observable<galleryInter[]> {
    return this.http.get<galleryInter[]>(this.url).pipe(
      tap((_) => this.log('Gallery Fetched')),
      catchError(this.handleError<galleryInter[]>('getGallery', []))
    );
  }
}
