import { Component, OnInit } from '@angular/core';
import { Interface } from './interface';
import { AnnouncementService } from '../announcement.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [NgFor, RouterModule, SearchComponent],
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  announcements: Interface[] = [];

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcementService
      .getAnnouncements()
      .subscribe((announcements) => (this.announcements = announcements));
  }

  delete(announcement: Interface): void {
    if (announcement.id !== undefined) {
      this.announcements = this.announcements.filter(
        (ann) => ann !== announcement
      );
      this.announcementService.deleteAnnouncements(announcement.id).subscribe();
    }
  }
}
