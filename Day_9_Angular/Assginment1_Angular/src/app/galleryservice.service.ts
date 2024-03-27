import { Injectable } from '@angular/core';
import { MessageserviceService } from './messageservice.service';
import { Observable, of } from 'rxjs';
import { galleryInter } from './gallery/galleryInter';
import { Galleryarr } from './gallery/galleryarr';

@Injectable({
  providedIn: 'root',
})
export class GalleryserviceService {
  constructor(private messageService: MessageserviceService) {}

  getGallery(): Observable<galleryInter[]> {
    this.messageService.add('Gallery Fetched');
    return of(Galleryarr);
  }
}
