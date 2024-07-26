import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconButton } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [
    MatDrawer,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatIconButton,
    RouterModule,
    RouterOutlet,
    NgIf,
    NgFor,
    MatSidenavModule,
  ],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css',
})
export class UserdashboardComponent {
  isLoggedIn: boolean = false;
  active = 'top';
  token: string | null = null;
  @ViewChild('drawer') drawer!: MatDrawer;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if token is present in localStorage
    this.isLoggedIn = !!this.authService.getToken();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('logout');
    this.isLoggedIn = false; // Update the login status
  }
}
