import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormArray } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  regform!: FormGroup;

  get userName() {
    return this.regform.get('userName');
  }

  get email() {
    return this.regform.get('email');
  }

  get addEmail() {
    return this.regform.get('addEmail') as FormArray;
  }

  addEmailfunction() {
    this.addEmail.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.regform = this.fb.group(
      {
        userName: [
          '',
          [Validators.required, Validators.minLength(3), Exception(/Vansh/)],
        ],
        password: [''],
        confirmPassword: [''],
        email: [''],
        checked: [''],
        phone: this.fb.group({
          telephone: [],
        }),
        addEmail: this.fb.array([]),
      },
      {
        validators: CheckingPassword,
      }
    );
    this.regform.get('checked')?.valueChanges.subscribe((check) => {
      const email = this.regform.get('email');
      if (check) {
        email?.setValidators(Validators.required);
      } else {
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    });
  }
  load() {
    this.regform.patchValue({
      userName: 'Vansh',
      password: '<PASSWORD>',
      confirmPassword: '<PASSWORD>',
      email: '<EMAIL>',
      phone: {
        telephone: '9876543210',
      },
    });
  }
}

function Exception(NotAllowed: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const Not = NotAllowed.test(control.value);

    return Not ? { NotAllowed: { value: control.value } } : null;
  };
}

function CheckingPassword(
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
