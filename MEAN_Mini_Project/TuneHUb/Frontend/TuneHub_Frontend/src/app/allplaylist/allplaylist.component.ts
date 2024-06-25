import { Component } from '@angular/core';
import { SongServiceService } from '../song-service.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { songInterface } from '../songInterface';

@Component({
  selector: 'app-allplaylist',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './allplaylist.component.html',
  styleUrls: ['./allplaylist.component.css'],
})
export class AllplaylistComponent {
  playlists: any[] = [];
  newPlaylist: any = { Name: '' };
  newSong: any = { playlistId: '', songId: '' };

  constructor(private playlistService: SongServiceService) {}

  ngOnInit() {
    this.getAllPlaylists();
  }

  getAllPlaylists() {
    this.playlistService.getAllPlaylists().subscribe(
      (data) => (this.playlists = data),
      (error) => console.error(error)
    );
  }

  createPlaylist() {
    this.playlistService.createPlaylist(this.newPlaylist).subscribe(
      (data) => {
        this.playlists.push(data);
        this.newPlaylist = { Name: '' };
      },
      (error) => console.error(error)
    );
  }

  deletePlaylist(id: string) {
    this.playlistService.deletePlaylist(id).subscribe(
      () => (this.playlists = this.playlists.filter((p) => p._id !== id)),
      (error) => console.error(error)
    );
  }
  addSongToPlaylist() {
    const { playlistId, songId } = this.newSong;
    this.playlistService.addSongToPlaylist(playlistId, songId).subscribe(
      (data) => {
        const playlist = this.playlists.find((p) => p._id === playlistId);
        if (playlist) {
          playlist.songs.push(data);
        }
        this.newSong = { playlistId: '', songId: '' };
      },
      (error) => console.error(error)
    );
  }
}
