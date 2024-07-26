import { Component, ChangeDetectionStrategy } from '@angular/core';
import { songInterface } from '../songInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SongServiceService } from '../song-service.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-addsong',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './addsong.component.html',
  styleUrl: './addsong.component.css',
})
export class AddsongComponent {
  songs: songInterface[] = [];
  addForm!: FormGroup;

  get Name() {
    return this.addForm.get('Name');
  }
  get singer() {
    return this.addForm.get('singer');
  }
  get musicdirector() {
    return this.addForm.get('musicdirector');
  }
  get releaseDate() {
    return this.addForm.get('releaseDate');
  }
  get albumName() {
    return this.addForm.get('albumName');
  }
  get imageurl() {
    return this.addForm.get('imageurl');
  }
  get visibility() {
    return this.addForm.get('visibility');
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private songService: SongServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      Name: ['', [Validators.required]],
      singer: ['', [Validators.required]],
      musicdirector: ['', [Validators.required]],
      releaseDate: [this.getCurrentDate(), [Validators.required]],
      albumName: ['', [Validators.required]],
      imageurl: [''],
      visibility: [true, [Validators.required]],
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }
  toggleVisibility(event: any) {
    this.addForm.patchValue({
      visibility: event.target.checked,
    });
  }

  add() {
    if (this.addForm.valid) {
      const {
        Name,
        singer,
        musicdirector,
        releaseDate,
        albumName,
        visibility,
        imageurl,
      } = this.addForm.value;
      this.songService
        .addsong({
          Name,
          singer,
          musicdirector,
          releaseDate,
          albumName,
          visibility,
          imageurl,
        })
        .subscribe((song: songInterface) => {
          this.songs.push(song);

          this.addForm.reset({
            releaseDate: this.getCurrentDate(),

            visibility: true,
            imageurl:
              'https://via.placeholder.com/150/ff6347/FFFFFF/?text=Dummy+App+2',
          });
          this.router.navigate(['/admin/dashboard/allsongs']);
        });
    }
  }

  goback(): void {
    this.location.back();
  }

  onSubmit() {
    this.add();
  }
}
