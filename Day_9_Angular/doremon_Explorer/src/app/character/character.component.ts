import { Component } from '@angular/core';
import { charInter } from './charInter';
import { CharacterserviceService } from '../characterservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent {
  chars: charInter[] = [];

  constructor(private characterService: CharacterserviceService) {}

  ngOnInit(): void {
    this.getchar();
  }

  getchar(): void {
    this.characterService.getChar().subscribe((c) => (this.chars = c));
  }
}
