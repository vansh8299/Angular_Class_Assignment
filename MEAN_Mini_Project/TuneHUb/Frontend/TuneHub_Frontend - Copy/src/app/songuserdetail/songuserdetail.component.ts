import { Component } from '@angular/core';
import { songInterface } from '../songInterface';
import { SongServiceService } from '../song-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-songuserdetail',
  standalone: true,
  imports: [],
  templateUrl: './songuserdetail.component.html',
  styleUrl: './songuserdetail.component.css',
})
export class SonguserdetailComponent {
  songdetail?: songInterface;

  constructor(
    private songService: SongServiceService,

    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getsongdetail();
  }

  getsongdetail(): void {
    const id1 = this.route.snapshot.paramMap.get('id');
    if (id1 !== null) {
      console.log(id1);
      this.songService.getsongdetail(id1).subscribe(
        (song) => (this.songdetail = song),
        (error) => console.error('Failed to fetch song details:', error)
      );
    } else {
      console.error('ID parameter is null');
    }
  }
  goback(): void {
    this.location.back();
  }
}
