import { Component } from '@angular/core';
import { chardetailInter } from './chardetailInterface';
import { CharaterdetailserviceService } from '../charaterdetailservice.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  chardetails?: chardetailInter;

  constructor(
    private characterdetailService: CharaterdetailserviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getchardetail();
  }

  getchardetail(): void {
    const id1 = Number(this.route.snapshot.paramMap.get('charid'));
    console.log(id1);
    this.characterdetailService
      .getChardetail(id1)
      .subscribe((c) => (this.chardetails = c));
  }
  getBack(): void {
    this.location.back();
  }
}
