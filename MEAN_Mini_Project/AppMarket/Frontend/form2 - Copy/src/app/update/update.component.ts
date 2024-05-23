import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    NgbToastModule,
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  updateForm!: FormGroup;
  show: boolean = false;
  get AppName() {
    return this.updateForm.get('AppName');
  }

  get description() {
    return this.updateForm.get('description');
  }

  get releasedate() {
    return this.updateForm.get('releasedate');
  }
  get version() {
    return this.updateForm.get('version');
  }
  get avgrating() {
    return this.updateForm.get('avgrating');
  }
  get downloadCount() {
    return this.updateForm.get('downloadCount');
  }
  get genre() {
    return this.updateForm.get('genre');
  }
  get visibility() {
    return this.updateForm.get('visibility');
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      AppName: ['IRCTC Railway'],
      description: ['Online Ticket Booking Platform'],

      releasedate: [this.getCurrentDate()],
      version: ['1.0'],
      avgrating: ['4'],
      downloadCount: ['6'],
      genre: [''],
      visibility: [true],
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }

  toggleVisibility(event: any) {
    this.updateForm.patchValue({
      visibility: event.target.checked,
    });
  }
  onSubmit() {
    console.log(this.updateForm.value);
    this.show = true;
    this.updateForm.reset();
  }
}
