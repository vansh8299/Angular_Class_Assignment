import { Component } from '@angular/core';
import { Member } from './member';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MEMBERS } from '../my-member';
import { MemberDetailComponent } from '../member-detail/member-detail.component';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, MemberDetailComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberComponent {
  members = MEMBERS;

  selectedMember?: Member;
  onSelect(member: Member): void {
    this.selectedMember = member;
  }
}
