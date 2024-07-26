import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../features/footer/footer.component';
import { SuccessmessageComponent } from '../../../features/successmessage/successmessage.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrormessageComponent } from '../../../features/errormessage/errormessage.component';
import { LoaderComponent } from '../../../features/loader/loader.component';
import { mustMatchValidator } from '../../directive/must-match.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    FooterComponent,
    MatDialogModule,
    SuccessmessageComponent,
    ErrormessageComponent,
    LoaderComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  showLoader = false;
  errorMessage: string | null = null;

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private dialog: MatDialog
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9!@#$%^&*_=+-]{8,12}$'),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: mustMatchValidator('password', 'confirmPassword') }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password } = this.registerForm.value;
    this.authService.register(username, email, password).subscribe(
      () => {
        console.log('Registered Successfully');
        this.showLoader = true;
        setTimeout(() => {
          this.showLoader = false;
          this.dialog.open(SuccessmessageComponent, {
            data: { message: 'Registered Successfully' },
          });
          this.router.navigate(['/login']);
        }, 3000);
      },
      (error) => {
        console.error('Registration failed', error);
        this.dialog.open(ErrormessageComponent, {
          data: {
            message:
              error.status === 0
                ? 'Unable to connect to the server. Please try again later.'
                : error.error
                ? error.error.message
                : 'Already registered',
          },
        });
      }
    );
  }
}
