import { Component } from '@angular/core';
import { galleryInter } from './galleryInter';
import { GalleryserviceService } from '../galleryservice.service';
import { Location } from '@angular/common';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  images?: galleryInter[];
  constructor(
    private galleryService: GalleryserviceService,
    private location: Location
  ) {}
  ngOnInit() {
    this.getgallery();
  }
  getgallery() {
    this.galleryService.getGallery().subscribe((gal) => (this.images = gal));
  }

  getBack() {
    this.location.back();
  }
}
