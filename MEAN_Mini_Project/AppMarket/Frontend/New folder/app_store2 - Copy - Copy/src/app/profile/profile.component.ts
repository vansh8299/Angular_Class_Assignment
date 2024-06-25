import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  token: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
  }
}
