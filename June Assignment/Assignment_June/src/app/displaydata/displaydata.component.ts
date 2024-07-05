import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Userinterface } from '../interface';
import { CustomPipePipe } from '../custom-pipe.pipe';
import { CustomDirectiveDirective } from '../custom-directive.directive';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-displaydata',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    CustomPipePipe,
    CustomDirectiveDirective,
  ],
  templateUrl: './displaydata.component.html',
  styleUrl: './displaydata.component.css',
})
export class DisplaydataComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'password'];
  dataSource: Userinterface[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData().subscribe((data) => {
      if (data) {
        this.dataSource = data;
      }
    });
  }

  fetchData(): Observable<Userinterface[]> {
    return this.http.get<Userinterface[]>('api/data').pipe(
      catchError(() => of([])) // Return an empty array on error
    );
  }
}
