import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { Interface } from '../announcement/interface';
import { Location, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-announcement-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgbToastModule],
  templateUrl: './announcement-form.component.html',

  styleUrls: ['./announcement-form.component.css'],
})
export class AnnouncementFormComponent {
  announcements: Interface[] = [];
  createform!: FormGroup;
  show: boolean = false;

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private location: Location
  ) {}

  ngOnInit() {
    this.createform = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      date: [this.getCurrentDate(), [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }

  get title() {
    return this.createform.get('title');
  }

  get date() {
    return this.createform.get('date');
  }

  get content() {
    return this.createform.get('content');
  }

  add(title: string, date: string, content: string): void {
    if (this.createform.invalid) {
      return;
    }

    this.announcementService
      .addAnnouncements({
        title,
        date,
        content,
      })
      .subscribe((a: Interface) => {
        this.announcements.push(a);
        this.goback();
        this.show = true;
      });
  }
  goback(): void {
    this.location.back();
  }
}
