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

  get email() {
    return this.registrationForm.get('email');
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
          [Validators.required, Validators.minLength(3), NotAllowed(/angular/)],
        ],
        password: [''],
        confirmPassword: [''],
        email: [''],
        notify: [''],
        skill: this.fb.group({
          angularLevel: [''],
          githubLink: [''],
          portfolioLink: [''],
        }),
        addEmailField: this.fb.array([]),
      },
      { validators: PasswordValidator }
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

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Vansh'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   skill: new FormGroup({
  //     angularLevel: new FormControl(''),
  //     githubLink: new FormControl(''),
  //     portfolioLink: new FormControl(''),
  //   }),
  // });

  load() {
    this.registrationForm.patchValue({
      userName: 'Vansh',
      password: '1236',
      confirmPassword: '1236',
    });
  }
  onSubmit() {
    console.log(this.registrationForm.value);
  }
}

function NotAllowed(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenName.test(control.value);

    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

function PasswordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return password && confirmPassword && password.value != confirmPassword.value
    ? { misMatch: true }
    : null;
}
