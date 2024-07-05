import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Userinterface } from '../interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  data: Userinterface[] = [];

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private dataService: ServiceService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  add(name: string, email: string, password: string) {
    name = name.trim();
    email = email.trim();
    password = password.trim();
    if (!name && !email && !password) {
      return;
    }
    this.dataService
      .addItem({ name, email, password } as Userinterface)
      .subscribe((i) => this.data.push(i));
    this.router.navigate(['/display']);
  }

  goback(): void {
    this.location.back();
  }
}
