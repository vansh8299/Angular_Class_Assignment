import { Component } from '@angular/core';

import { CharacterserviceService } from '../characterservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { chardetailInter } from '../character-detail/chardetailInterface';
import { SearchComponent } from '../search/search.component';
@Component({
  selector: 'app-character',
  standalone: true,
  imports: [NgFor, RouterModule, SearchComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css',
})
export class CharacterComponent {
  chars: chardetailInter[] = [];

  constructor(private characterService: CharacterserviceService) {}

  ngOnInit(): void {
    this.getchar();
  }

  getchar(): void {
    this.characterService.getChar().subscribe((c) => (this.chars = c));
  }

  add(name: string, height: string, weight: string): void {
    name = name.trim();
    height = height.trim();
    weight = weight.trim();

    if (!name || !height || !weight) {
      return;
    }

    this.characterService
      .addchar({ name, height, weight } as chardetailInter)
      .subscribe((c) => this.chars.push(c));
  }

  delete(char: chardetailInter): void {
    this.chars = this.chars.filter((m) => m != char);
    this.characterService.deletechar(char.id).subscribe();
  }
}
