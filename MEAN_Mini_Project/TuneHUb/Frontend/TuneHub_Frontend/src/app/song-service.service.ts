import { Injectable } from '@angular/core';
import { songInterface } from './songInterface';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SongServiceService {
  private appUrl = 'http://localhost:3000/song';
  private playlisturl = 'http://localhost:3000/playlist';

  constructor(private http: HttpClient) {}
  private getHttpOptions() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.message);
      return of(result as T);
    };
  }
  getsong(): Observable<songInterface[]> {
    return this.http
      .get<songInterface[]>(this.appUrl, this.getHttpOptions())
      .pipe(catchError(this.handleError<songInterface[]>('getapp', [])));
  }
  getsongdetail(id1: string): Observable<songInterface> {
    const url = `${this.appUrl}/${id1}`;
    return this.http
      .get<songInterface>(url, this.getHttpOptions())
      .pipe(
        catchError(this.handleError<songInterface>(`getsongdetail id=${id1}`))
      );
  }

  addsong(song: songInterface): Observable<songInterface> {
    // const token = localStorage.getItem('authToken');
    // console.log(`Bearer ${token}`);
    return this.http
      .post<songInterface>(this.appUrl, song, this.getHttpOptions())
      .pipe(catchError(this.handleError<songInterface>('addsong')));
  }
  deletesong(id: string): Observable<songInterface> {
    const url = `${this.appUrl}/${id}`;
    return this.http
      .delete<songInterface>(url, this.getHttpOptions())
      .pipe(catchError(this.handleError<songInterface>('deletesong')));
  }
  updatesong(song: songInterface): Observable<any> {
    const url = `${this.appUrl}/${song._id}`;
    return this.http
      .put(url, song, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updatesong')));
  }

  getAllPlaylists(): Observable<any[]> {
    return this.http
      .get<any[]>(this.playlisturl, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('getAllPlaylists')));
  }
  getPlaylistById(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.playlisturl}/${id}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('getPlaylistById')));
  }

  createPlaylist(playlist: any): Observable<any> {
    return this.http
      .post<any>(this.playlisturl, playlist, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('createPlaylist')));
  }
  deletePlaylist(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.playlisturl}/${id}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('deletePlaylist')));
  }
  updatePlaylist(id: string, playlist: any): Observable<any> {
    return this.http
      .put<any>(`${this.playlisturl}/${id}`, playlist, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updatePlaylist')));
  }
  addSongToPlaylist(playlistId: string, songId: string): Observable<any> {
    return this.http.post<any>(
      `${this.appUrl}/addSong`,
      {
        playlistId,
        songId,
      },
      this.getHttpOptions()
    );
  }
}
