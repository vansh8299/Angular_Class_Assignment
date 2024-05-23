import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';
import { AppInterface } from '../appinterface';

@Component({
  selector: 'app-createappform',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    NgbToastModule,
    RouterModule,
  ],
  templateUrl: './createappform.component.html',
  styleUrls: ['./createappform.component.css'],
})
export class CreateappformComponent {
  apps: AppInterface[] = [];
  applicationForm!: FormGroup;
  show: boolean = false;

  get AppName() {
    return this.applicationForm.get('AppName');
  }

  get description() {
    return this.applicationForm.get('description');
  }

  get releasedate() {
    return this.applicationForm.get('releasedate');
  }

  get version() {
    return this.applicationForm.get('version');
  }

  get genre() {
    return this.applicationForm.get('genre');
  }

  get visibility() {
    return this.applicationForm.get('visibility');
  }

  get imageurl() {
    return this.applicationForm.get('imageurl');
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private appService: AppserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.applicationForm = this.fb.group({
      AppName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      releasedate: [this.getCurrentDate(), [Validators.required]],
      version: ['1.0.0', [Validators.required]],
      genre: ['', [Validators.required]],
      visibility: [true, [Validators.required]],
      imageurl: [
        'https://via.placeholder.com/150/ff6347/FFFFFF/?text=Dummy+App+2',
        [Validators.required],
      ],
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }

  toggleVisibility(event: any) {
    this.applicationForm.patchValue({
      visibility: event.target.checked,
    });
  }

  add() {
    if (this.applicationForm.valid) {
      const {
        AppName,
        description,
        releasedate,
        version,
        genre,
        visibility,
        imageurl,
      } = this.applicationForm.value;
      this.appService
        .addapp({
          app_name: AppName,
          description,
          release_date: releasedate,
          version,
          genre,
          visibility,
          imageurl,
        })
        .subscribe((app: AppInterface) => {
          this.apps.push(app);
          this.show = true;
          this.applicationForm.reset({
            releasedate: this.getCurrentDate(),
            version: '1.0.0',
            visibility: true,
            imageurl:
              'https://via.placeholder.com/150/ff6347/FFFFFF/?text=Dummy+App+2',
          });
          this.router.navigate(['/home']);
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
