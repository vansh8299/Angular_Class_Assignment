import { Component } from '@angular/core';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { CustomdashboardDirective } from '../../shared/directive/customdashboard.directive';
import { CustomdashboardPipe } from '../../shared/pipe/customdashboard.pipe';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    NgIf,
    NgFor,
    FooterComponent,
    CustomdashboardDirective,
    CustomdashboardPipe,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  apps: { name: string; image: string; description: string }[] = [];
  app4!: { name: string; image: string; description: string };
  currentPage = 1;
  itemsPerPage = 4;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.authService.getapp().subscribe({
      next: (data) => {
        this.app4 = {
          name: data,
          image: 'assets/zerodha.jpeg',
          description: 'Investment App',
        };
        this.apps = [
          {
            name: 'Whatsapp',
            image: 'assets/whatsapp.jpeg',
            description: 'Social Media Platform',
          },
          {
            name: 'Facebook',
            image: 'assets/facebook.jpeg',
            description: 'Social Media Platform',
          },
          {
            name: 'Groww',
            image: 'assets/grow-app.png',
            description: 'Investment App',
          },
          {
            name: 'Yono',
            image: 'assets/yono.jpeg',
            description: 'Banking App',
          },
          {
            name: 'Youtube',
            image: 'assets/youtube.png',
            description: 'Entertainement Platform',
          },
          {
            name: 'Paytm',
            image: 'assets/paytm.png',
            description: 'Payment App',
          },
          {
            name: 'Sony',
            image: 'assets/sony.jpeg',
            description: 'Social Media Platform',
          },

          this.app4,
        ];
        this.currentPage = 1;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('logout');
  }

  get paginatedApps() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.apps.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    console.log('Current Page:', this.currentPage);
    if (this.currentPage * this.itemsPerPage < this.apps.length) {
      this.currentPage++;
    }
    console.log('Next Page:', this.currentPage);
  }

  previousPage() {
    console.log('Current Page:', this.currentPage);
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    console.log('Previous Page:', this.currentPage);
  }

  get canPrevious() {
    return this.currentPage > 1;
  }

  get canNext() {
    return this.currentPage * this.itemsPerPage < this.apps.length;
  }
}
