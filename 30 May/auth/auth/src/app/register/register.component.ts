import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;
    this.authService.register(name, email, password).subscribe(
      (response) => {
        this.successMessage = response.message;
        console.log(this.successMessage);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error
          ? error.error.message
          : 'Registration failed. Please try again.';
      }
    );
  }
}
