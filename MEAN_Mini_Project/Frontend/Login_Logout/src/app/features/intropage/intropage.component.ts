import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-intropage',
  standalone: true,
  imports: [],
  templateUrl: './intropage.component.html',
  styleUrls: ['./intropage.component.css'],
})
export class IntropageComponent {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.router.navigate(['/register']);
  }
}
