import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  get email() {
    return this.registerForm.get('email');
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });
  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      return;
    }

    const { email, password, role } = this.registerForm.value;
    this.authService.register(email, password, role).subscribe(
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
