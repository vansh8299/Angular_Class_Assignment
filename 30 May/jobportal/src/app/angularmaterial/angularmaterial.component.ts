import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { movieinterface } from './movieinterface';
import { MaterialserviceService } from '../materialservice.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-angularmaterial',
  standalone: true,
  imports: [MatSlideToggleModule, MatCardModule, MatButtonModule, NgFor],
  templateUrl: './angularmaterial.component.html',
  styleUrl: './angularmaterial.component.css',
})
export class AngularmaterialComponent {
  movies: movieinterface[] = [];
  constructor(private movieService: MaterialserviceService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovie().subscribe((c) => (this.movies = c));
  }
}
