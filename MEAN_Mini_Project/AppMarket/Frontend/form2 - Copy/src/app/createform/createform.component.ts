import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-createform',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    NgbToastModule,
    RouterModule,
  ],
  templateUrl: './createform.component.html',
  styleUrl: './createform.component.css',
})
export class CreateformComponent {
  applicationForm!: FormGroup;
  show: boolean = false;
  get AppName() {
    return this.applicationForm.get('AppName');
  }

  get description() {
    return this.applicationForm.get('description');
  }

  get releasedate() {
    return this.applicationForm.get('releasedate');
  }
  get version() {
    return this.applicationForm.get('version');
  }
  get genre() {
    return this.applicationForm.get('genre');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.applicationForm = this.fb.group({
      AppName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],

      releasedate: [this.getCurrentDate(), [Validators.required]],
      version: ['1.0', [Validators.required]],
      genre: ['', [Validators.required]],
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }
  onSubmit() {
    console.log(this.applicationForm.value);
    this.show = true;
    this.applicationForm.reset();
  }
}
