import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobInterface } from './jobinterface';
@Injectable({
  providedIn: 'root',
})
export class JobServiceService {
  private url = 'api/jobs';
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

  getJobs(): Observable<JobInterface[]> {
    return this.http
      .get<JobInterface[]>(this.url)
      .pipe(catchError(this.handleError<JobInterface[]>('getJobs', [])));
  }
  addjob(job: JobInterface): Observable<JobInterface> {
    return this.http
      .post<JobInterface>(this.url, job, this.httpOptions)
      .pipe(catchError(this.handleError<JobInterface>('addjob')));
  }
  updatejob(job: JobInterface): Observable<any> {
    const url = `${this.url}/${job.id}`;
    return this.http
      .put(url, job, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updatejob')));
  }
  getjobdetail(id: number): Observable<JobInterface> {
    const url = `${this.url}/${id}`;
    return this.http.get<JobInterface>(url);
  }
  deletejob(id: number): Observable<JobInterface> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<JobInterface>(url, this.httpOptions)
      .pipe(catchError(this.handleError<JobInterface>('deleteapp')));
  }
}
