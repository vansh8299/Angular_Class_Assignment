import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  regform!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.regform = this.fb.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
      email: [''],
      phone: this.fb.group({
        telephone: [],
      }),
    });
  }
}
