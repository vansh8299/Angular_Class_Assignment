import { Component } from '@angular/core';
import { characterinterface } from './characterInterface';
import { CharaterserviceService } from '../charaterservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  chars: characterinterface[] = [];

  constructor(private charService: CharaterserviceService) {}
  ngOnInit() {
    this.getcharacter();
  }
  getcharacter(): void {
    this.charService.getChar().subscribe((c) => (this.chars = c));
  }
}
