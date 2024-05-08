import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  registrationForm!: FormGroup;
  successmessage: boolean = false;
  errormessage: boolean = false;
  // Getter functions for form controls
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
    // Initializing the registration form with form controls and validators
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // Check if the form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    const data = this.registrationForm.value;

    const url = 'https://jsonplaceholder.typicode.com/posts';

    // Sending form data to a server
    this.http
      .post(url, data)
      .pipe(
        catchError((error) => {
          // Handling error if the request fails
          this.successmessage = false;
          this.errormessage = true;
          return throwError(error);
        })
      )
      .subscribe((res) => {
        // Handling success response
        console.log('Response:', res);
        this.successmessage = true;
        this.errormessage = false;
      });
  }
}
