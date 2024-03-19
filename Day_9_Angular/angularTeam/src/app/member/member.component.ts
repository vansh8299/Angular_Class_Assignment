import { Component } from '@angular/core';
import { Member } from './member';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MEMBERS } from '../my-member';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { MemberServiceService } from '../member-service.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-member',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, MemberDetailComponent, RouterModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberComponent {
  members: Member[] = [];

  constructor(
    private memberService: MemberServiceService,
    private messageService: MessageService
  ) {}
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
    this.messageService.add(`Selected member: ${member.id}`);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.memberService
      .addMember({ name } as Member)
      .subscribe((member) => this.members.push(member));
  }

  delete(member: Member): void {
    this.members = this.members.filter((m) => m != member);
    this.memberService.deleteMember(member.id).subscribe();
  }
}
