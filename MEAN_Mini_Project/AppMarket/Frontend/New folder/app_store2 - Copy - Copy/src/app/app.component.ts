import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AppserviceService } from './appservice.service';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
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
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  active = 'top';
  token: string | null = null;
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    console.log('logout ');
  }
}
