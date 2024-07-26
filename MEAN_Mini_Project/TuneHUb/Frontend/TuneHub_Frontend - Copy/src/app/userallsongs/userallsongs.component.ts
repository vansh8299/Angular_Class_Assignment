import { Component } from '@angular/core';
import { songInterface } from '../songInterface';
import { SongServiceService } from '../song-service.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { SelectplaylistComponent } from '../selectplaylist/selectplaylist.component';

@Component({
  selector: 'app-userallsongs',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule, NgFor],
  templateUrl: './userallsongs.component.html',
  styleUrl: './userallsongs.component.css',
})
export class UserallsongsComponent {
  songs: songInterface[] = [];

  constructor(
    private songService: SongServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getsong();
  }

  getsong(): void {
    this.songService.getsong().subscribe((song) => (this.songs = song));
  }

  addToPlaylist(songId: string | undefined): void {
    if (!songId) {
      console.error('Song ID is undefined');
      return;
    }

    const dialogRef = this.dialog.open(SelectplaylistComponent, {
      width: '250px',
      data: { songId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.playlistId) {
        this.songService.addSongToPlaylist(result.playlistId, songId).subscribe(
          (data) => {
            console.log('Song added to playlist', data);
          },
          (error) => console.error(error)
        );
      }
    });
  }
}
