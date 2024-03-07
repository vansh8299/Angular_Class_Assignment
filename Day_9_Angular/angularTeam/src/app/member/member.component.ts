import { Component } from '@angular/core';
import { Member } from './member';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MEMBERS } from '../my-member';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { MemberServiceService } from '../member-service.service';
@Component({
  selector: 'app-member',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, MemberDetailComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberComponent {
  members: Member[] = [];

  constructor(private memberService: MemberServiceService) {}
  ngOnInit(): void {
    this.getMembers();
  }
  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }

  selectedMember?: Member;
  onSelect(member: Member): void {
    this.selectedMember = member;
  }
}
