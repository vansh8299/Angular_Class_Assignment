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
export class UpdateformComponent {
  announcement?: Interface;
  updateform!: FormGroup;
  show: boolean = false;

  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private location: Location,
    private activatedRoute: ActivatedRoute
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

  edit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {
      this.announcementService.getAnnouncementById(+id).subscribe(
        (announcement) => {
          if (announcement) {
            this.announcement = announcement;
            this.updateform.patchValue({
              title: this.announcement.title,
              date: this.getCurrentDate(),
              content: this.announcement.content,
            });
          } else {
            console.error('Announcement not found');
          }
        },
        (error) => {
          console.error('Error fetching announcement', error);
        }
      );
    } else {
      console.error('Invalid ID');
    }
  }

  save(): void {
    if (this.updateform.valid) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id && !isNaN(+id)) {
        const updatedAnnouncement: Interface = {
          id: +id,
          ...this.updateform.value,
        };
        this.announcementService
          .updateAnnouncements(updatedAnnouncement)
          .subscribe(
            () => {
              this.goBack();
              this.show = true;
            },
            (error) => {
              console.error('Error updating announcement', error);
            }
          );
      } else {
        console.error('Invalid ID');
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
