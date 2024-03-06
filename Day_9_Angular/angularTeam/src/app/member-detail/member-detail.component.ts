import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Member } from '../member/member';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, UpperCasePipe],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent {
  @Input() member?: Member;
}
