import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Member } from '../member/member';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MemberServiceService } from '../member-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, UpperCasePipe],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent {
  constructor(
    private memberService: MemberServiceService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  member?: Member;

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.memberService.getMember(id).subscribe((m) => (this.member = m));
  }

  goBack(): void {
    this.location.back();
  }
}
