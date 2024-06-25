import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  active = 'top';
  token: string | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check if token is present in localStorage
    this.isLoggedIn = !!this.authService.getToken();
  }
  logout(): void {
    this.authService.logout();
    console.log('logout ');
    this.isLoggedIn = false; // Update the login status
  }
}
