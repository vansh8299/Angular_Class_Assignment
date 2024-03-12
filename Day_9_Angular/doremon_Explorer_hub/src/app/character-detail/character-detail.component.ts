import { Component } from '@angular/core';
import { CharaterserviceService } from '../charaterservice.service';
import { characterinterface } from '../characters/characterInterface';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  chars: characterinterface[] = [];

  constructor(private charService: CharaterserviceService) {}
  ngOnInit() {
    this.getcharacter();
  }
  getcharacter(): void {
    this.charService.getChar().subscribe((c) => (this.chars = c));
  }
}
