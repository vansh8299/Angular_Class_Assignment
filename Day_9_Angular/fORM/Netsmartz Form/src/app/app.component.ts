import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  registrationForm!: FormGroup;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        firstName: ['Vansh', [Validators.required]],
        lastName: ['Misra', [Validators.required]],

        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
      {}
    );
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const formData = this.registrationForm.value;

    // Mock API endpoint (replace with your actual endpoint)
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    this.http
      .post(apiUrl, formData)
      .pipe(
        catchError((error) => {
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
          return throwError(error);
        })
      )
      .subscribe((response) => {
        console.log('Response:', response);
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
      });
  }
}
