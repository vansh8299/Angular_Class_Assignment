import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  FormArray,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  registrationForm!: FormGroup;
  get userName() {
    return this.registrationForm.get('userName');
  }

  get dob() {
    return this.registrationForm.get('dob');
  }

  get gender() {
    return this.registrationForm.get('gender');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get favoriteGadget() {
    return this.registrationForm.get('favoriteGadget');
  }

  get addEmailField() {
    return this.registrationForm.get('addEmailField') as FormArray;
  }

  addEmailFieldfunction() {
    this.addEmailField.push(this.fb.control(''));
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    (this.registrationForm = this.fb.group(
      {
        userName: [
          'John',
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
        dob: ['', [Validators.required, this.minage(13)]],
        gender: [''],
        email: [
          '',
          [Validators.required, Validators.email, this.emailDomainValidator],
        ],
        membershipType: ['basic'],
        communicationMethod: [''],
        favoriteGadget: ['', Validators.required],

        notify: [''],

        addEmailField: this.fb.array([]),
      },
      { validators: this.PasswordValidator }
    )),
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

  load() {
    this.registrationForm.patchValue({
      userName: 'Vansh',
      password: 'Abc123@',
      confirmPassword: 'Abc123@',
    });
  }
  onSubmit() {
    console.log(this.registrationForm.value);
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

  emailDomainValidator(control: any) {
    const email = control.value;
    if (email && email.indexOf('@') > -1) {
      const [_, domain] = email.split('@');
      if (domain !== 'gmail.com') {
        return { invalidDomain: true };
      }
    }
    return null;
  }

  minage(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control || !control.value) {
        return null;
      }
      const dob = new Date(control.value);
      const ageDiff = Date.now() - dob.getTime();
      const ageDate = new Date(ageDiff);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      return calculatedAge < minAge
        ? { minAge: { value: control.value } }
        : null;
    };
  }

  PasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.pristine || confirmPassword?.pristine) {
      return null;
    }
    return password &&
      confirmPassword &&
      password.value != confirmPassword.value
      ? { misMatch: true }
      : null;
  }
}
