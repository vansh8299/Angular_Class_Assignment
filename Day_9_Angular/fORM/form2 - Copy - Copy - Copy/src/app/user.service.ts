import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
}
