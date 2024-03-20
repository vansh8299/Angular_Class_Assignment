import { Component } from '@angular/core';
import { Member } from '../member/member';
import { MemberServiceService } from '../member-service.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MemberSearchComponent } from '../member-search/member-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterModule, MemberSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  members: Member[] = [];
  constructor(private MemberService: MemberServiceService) {}

  ngOnInit() {
    this.getMem();
  }

  getMem(): void {
    this.MemberService.getMembers().subscribe((mem) => (this.members = mem));
  }
}
