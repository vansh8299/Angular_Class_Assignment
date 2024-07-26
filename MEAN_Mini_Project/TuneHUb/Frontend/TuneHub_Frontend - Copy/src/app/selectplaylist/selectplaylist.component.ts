import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { SongServiceService } from '../song-service.service';

@Component({
  selector: 'app-selectplaylist',
  standalone: true,
  imports: [NgFor, MatSelectModule, MatOptionModule, FormsModule],
  templateUrl: './selectplaylist.component.html',
  styleUrl: './selectplaylist.component.css',
})
export class SelectplaylistComponent implements OnInit {
  playlists: any[] = [];
  selectedPlaylistId?: string;

  constructor(
    private playlistService: SongServiceService,
    public dialogRef: MatDialogRef<SelectplaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { songId: string }
  ) {}

  ngOnInit(): void {
    this.getAllPlaylists();
  }

  getAllPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe(
      (data) => (this.playlists = data),
      (error) => console.error(error)
    );
  }

  onAddClick(): void {
    if (this.selectedPlaylistId) {
      this.dialogRef.close({ playlistId: this.selectedPlaylistId });
    }
  }
}
