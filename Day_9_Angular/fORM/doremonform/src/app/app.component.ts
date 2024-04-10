import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'doremonform';

  registrationForm!: FormGroup;

  get userName() {
    return this.registrationForm.get('Personal.userName');
  }

  get dob() {
    return this.registrationForm.get('Personal.dob');
  }

  get password() {
    return this.registrationForm.get('Personal.password');
  }

  get email() {
    return this.registrationForm.get('Personal.email');
  }
  get confirmPassword() {
    return this.registrationForm.get('Personal.confirmPassword');
  }

  get favoriteGadget() {
    return this.registrationForm.get('Account.favoriteGadget');
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Creating the registration form group and nested form group for userName
    this.registrationForm = this.fb.group({
      Personal: this.fb.group({
        userName: [
          'Vansh',
          [
            Validators.required,
            Validators.minLength(4),
            this.checkDuplicateName(),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        dob: ['', [Validators.required]],
        gender: [''],
        email: ['', [Validators.required, Validators.email, this.emailDOmain]],
      }),
      Account: this.fb.group({
        membershipType: ['basic'],
        communicationMethod: [''],
        favoriteGadget: ['', Validators.required],
        notify: [''],
      }),
    });
    this.registrationForm.get('notify')?.valueChanges.subscribe((check) => {
      const email = this.registrationForm.get('email');
      if (check) {
        email?.setValidators(Validators.required);
      } else {
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    });
  }

  checkDuplicateName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control || !control.value) {
        return null;
      }
      const forbiddenNames = ['doraemon', 'nobita', 'shizuka', 'gian', 'suneo'];
      const value = control.value.toLowerCase();
      const forbidden = forbiddenNames.includes(value);
      return forbidden ? { duplicateName: { value: control.value } } : null;
    };
  }

  emailDOmain(control: any) {
    const email = control.value;
    if (email && email.indexOf('@') > -1) {
      const [_, doamin] = email.split('@');
      if (doamin !== 'gmail.com') {
        return { invalidemail: true };
      }
    }
    return null;
  }
}
