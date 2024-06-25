import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../header/header.component';
import { AppserviceService } from '../appservice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    NgbToastModule,
    RouterModule,
    NgbNavModule,
  ],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent {
  isLoggedIn: boolean = false;
  active = 'top';
  token: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if token is present in localStorage
    this.isLoggedIn = !!this.authService.getToken();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('logout ');
    this.isLoggedIn = false; // Update the login status
  }
}
