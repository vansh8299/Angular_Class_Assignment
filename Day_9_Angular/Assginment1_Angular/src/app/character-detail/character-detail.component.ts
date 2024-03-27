import { Component } from '@angular/core';
import { chardetailInter } from './chardetailInterface';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CharacterserviceService } from '../characterservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  chardetails?: chardetailInter;

  constructor(
    private characterdetailService: CharacterserviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getchardetail();
  }

  getchardetail(): void {
    const id1 = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id1);
    this.characterdetailService
      .getChardetail(id1)
      .subscribe((c) => (this.chardetails = c));
  }
  getBack(): void {
    this.location.back();
  }
  save() {
    if (this.chardetails) {
      this.characterdetailService
        .updatecharacter(this.chardetails)
        .subscribe(() => this.getBack());
    }
  }
}
