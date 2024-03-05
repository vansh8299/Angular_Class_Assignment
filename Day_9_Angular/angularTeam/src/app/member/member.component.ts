import { Component } from '@angular/core';
import { Member } from './member';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MEMBERS } from '../my-member';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberComponent {
  members = MEMBERS;
}
