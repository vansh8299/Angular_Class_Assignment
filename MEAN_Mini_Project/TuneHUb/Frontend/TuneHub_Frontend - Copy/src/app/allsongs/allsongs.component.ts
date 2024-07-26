import { Component } from '@angular/core';
import { songInterface } from '../songInterface';
import { SongServiceService } from '../song-service.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-allsongs',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule, NgFor],
  templateUrl: './allsongs.component.html',
  styleUrl: './allsongs.component.css',
})
export class AllsongsComponent {
  songs: songInterface[] = [];
  constructor(
    private songService: SongServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getsong();
  }

  getsong(): void {
    this.songService.getsong().subscribe((song) => (this.songs = song));
  }

  delete(song: songInterface): void {
    if (song._id !== undefined) {
      this.songs = this.songs.filter((s) => s !== song);
      this.songService.deletesong(song._id).subscribe();
    }
  }
  // addDownload(id: string | undefined): void {
  //   if (id) {
  //     console.log(id);
  //     this.installService.addtodownload(id).subscribe(
  //       () => {},
  //       (error) => {
  //         console.error('Error adding download', error);
  //       }
  //     );
  //   } else {
  //     console.error('App ID is undefined');
  //   }
  // }
}
