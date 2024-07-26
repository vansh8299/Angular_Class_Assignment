import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from '../../../features/loader/loader.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../features/footer/footer.component';
import { SuccessmessageComponent } from '../../../features/successmessage/successmessage.component';
import { ErrormessageComponent } from '../../../features/errormessage/errormessage.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    FooterComponent,
    LoaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  showLoader = false;
  errorMessage: string | null = null;

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      () => {
        console.log('Login Successfully');

        this.showLoader = true;
        setTimeout(() => {
          this.showLoader = false;
          this.dialog.open(SuccessmessageComponent, {
            data: { message: 'Login Successfully' },
          });
          this.router.navigate(['/dashboard']);
        }, 3000);
      },
      (error) => {
        console.error('Login failed', error);
        this.dialog.open(ErrormessageComponent, {
          data: {
            message:
              error.status === 0
                ? 'Unable to connect to the server. Please try again later.'
                : error.error
                ? error.error.message
                : 'Login failed. Please try again.',
          },
        });
      }
    );
  }
}
