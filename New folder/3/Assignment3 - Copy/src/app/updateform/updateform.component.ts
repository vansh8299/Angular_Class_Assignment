import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { Interface } from '../announcement/interface';
import { Location, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-updateform',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgbToastModule],
  templateUrl: './updateform.component.html',
  styleUrl: './updateform.component.css',
})
export class updateformComponent {
  announcement?: Interface;
  updateform!: FormGroup;
  show: boolean = false;

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private location: Location,
    private activatedrouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.updateform = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      date: [this.getCurrentDate()],
      content: ['', [Validators.required, Validators.minLength(7)]],
    });
    this.edit();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }

  get title() {
    return this.updateform.get('title');
  }

  get date() {
    return this.updateform.get('date');
  }

  get content() {
    return this.updateform.get('content');
  }

  edit(): void {
    const id = this.activatedrouter.snapshot.paramMap.get('id');
    if (id) {
      this.announcementService.getAnnouncementById(+id).subscribe((i) => {
        this.announcement = i;
        this.updateform.patchValue({
          title: this.announcement.title,
          date: this.getCurrentDate(),
          content: this.announcement.content,
        });
      });
    }
  }

  save(): void {
    if (this.updateform.valid) {
      const id = this.activatedrouter.snapshot.paramMap.get('id');
      if (id) {
        const updatedAnnouncement = {
          id: +id,
          ...this.updateform.value,
        };
        this.announcementService
          .updateAnnouncements(updatedAnnouncement)
          .subscribe(() => {
            this.goback();
            this.show = true;
          });
      }
    }
  }

  goback(): void {
    this.location.back();
  }
}
