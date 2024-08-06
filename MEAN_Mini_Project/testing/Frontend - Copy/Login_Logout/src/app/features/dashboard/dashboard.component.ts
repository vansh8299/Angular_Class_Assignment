import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApplicationsService } from '../../core/services/applications.service';
import { appInterface } from '../appinterface';
import { CustomdashboardDirective } from '../../shared/directive/customdashboard.directive';
import { SearchComponent } from '../search/search.component';
import { CustomdashboardPipe } from '../../shared/pipe/customdashboard.pipe';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ThemeComponent } from '../theme/theme.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgIf,
    NgFor,
    FooterComponent,
    RouterModule,
    MatCardModule,
    MatTableModule,
    CustomdashboardDirective,
    SearchComponent,
    CustomdashboardPipe,
    FormsModule,
    MatIconModule,
    ThemeComponent,
    NgClass,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  apps: appInterface[] = [];
  dataSource: MatTableDataSource<appInterface>;
  displayedColumns: string[] = ['name', 'image', 'description', 'actions'];
  currentPage = 1;
  itemsPerPage = 4;
  filterText: string = '';
  mytheme: any = 'light-theme';

  constructor(private router: Router, private appService: ApplicationsService) {
    this.dataSource = new MatTableDataSource(this.apps);
  }

  ngOnInit(): void {
    this.fetch();
  }
  ngDoCheck(): void {
    this.mytheme = localStorage.getItem('theme');
    console.log(this.mytheme);
  }

  fetch(): void {
    this.appService.get().subscribe((app) => {
      this.apps = app;
      this.updatePagination();
    });
  }

  delete(app: appInterface): void {
    if (app.id !== undefined) {
      this.apps = this.apps.filter((s) => s !== app);
      this.appService.delete(app.id).subscribe(() => {
        this.updatePagination();
      });
    }
  }

  get paginatedApps() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.apps.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.apps.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  updatePagination() {
    this.dataSource.data = this.paginatedApps;
  }

  get canPrevious() {
    return this.currentPage > 1;
  }

  get canNext() {
    return this.currentPage * this.itemsPerPage < this.apps.length;
  }

  sortAlphabetically() {
    this.apps.sort((x, y) => x.name.localeCompare(y.name));
    this.updatePagination();
  }

  filterByDescription() {
    const filteredApps = this.apps.filter((app) =>
      app.description.toLowerCase().includes(this.filterText.toLowerCase())
    );
    this.dataSource.data = filteredApps.slice(0, this.itemsPerPage);
  }
}
