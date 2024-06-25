import { Component } from '@angular/core';
import { songInterface } from '../songInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongServiceService } from '../song-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-updatesong',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './updatesong.component.html',
  styleUrl: './updatesong.component.css',
})
export class UpdatesongComponent {
  songs?: songInterface;
  updateForm!: FormGroup;

  get Name() {
    return this.updateForm.get('Name');
  }
  get singer() {
    return this.updateForm.get('singer');
  }
  get musicdirector() {
    return this.updateForm.get('musicdirector');
  }
  get releaseDate() {
    return this.updateForm.get('releaseDate');
  }
  get albumName() {
    return this.updateForm.get('albumName');
  }
  get imageurl() {
    return this.updateForm.get('imageurl');
  }
  get visibility() {
    return this.updateForm.get('visibility');
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private songService: SongServiceService,
    private router: Router,
    private activatedrouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      Name: [''],
      singer: [''],
      musicdirector: [''],
      releaseDate: [this.getCurrentDate()],
      albumName: [''],
      imageurl: [
        'https://via.placeholder.com/150/ff6347/FFFFFF/?text=Dummy+Song+2',
      ],
      visibility: [true],
    });
    this.edit();
  }
  edit(): void {
    const id1 = this.activatedrouter.snapshot.paramMap.get('id');
    if (id1) {
      this.songService.getsongdetail(id1).subscribe((i) => {
        this.songs = i;
        this.updateForm.patchValue({
          Name: this.songs?.Name,
          singer: this.songs?.singer,
          musicdirector: this.songs?.musicdirector,
          albumName: this.songs?.albumName,
          releaseDate: this.getCurrentDate(),
          visibility: this.songs?.visibility,
          imageurl: this.songs?.imageurl,
        });
      });
    }
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }

  save(): void {
    if (this.updateForm.valid) {
      const id1 = this.activatedrouter.snapshot.paramMap.get('id');
      if (id1 !== null) {
        const updatedSong = {
          _id: id1,
          ...this.updateForm.value,
        };
        console.log(id1);
        this.songService.updatesong(updatedSong).subscribe(() => {
          this.router.navigate(['admin/dashboard/allsongs']);
        });
      }
    }
  }
  toggleVisibility(event: any) {
    this.updateForm.patchValue({
      visibility: event.target.checked,
    });
  }
  goBack(): void {
    this.location.back();
  }
}
