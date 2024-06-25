import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AppserviceService } from '../appservice.service';
import { AppInterface } from '../appinterface';

@Component({
  selector: 'app-updateappform',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    NgbToastModule,
  ],
  templateUrl: './updateappform.component.html',
  styleUrl: './updateappform.component.css',
})
export class UpdateappformComponent {
  app1?: AppInterface;
  updateForm!: FormGroup;
  show: boolean = false;
  get app_name() {
    return this.updateForm.get('app_name');
  }

  get description() {
    return this.updateForm.get('description');
  }

  get release_date() {
    return this.updateForm.get('release_date');
  }
  get version() {
    return this.updateForm.get('version');
  }
  get averageRating() {
    return this.updateForm.get('averageRating');
  }
  get downloadCount() {
    return this.updateForm.get('downloadCount');
  }
  get genre() {
    return this.updateForm.get('genre');
  }
  get visibility() {
    return this.updateForm.get('visibility');
  }
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private activatedrouter: ActivatedRoute,
    private appService: AppserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      app_name: [''],
      description: [''],

      release_date: [],
      version: [''],
      averageRating: [''],
      downloadCount: [''],
      genre: [''],
      visibility: [],
      imageurl: [
        'https://via.placeholder.com/150/ff6347/FFFFFF/?text=Dummy+App+2',
      ],
      user: [],
      comments: [],
    });
    this.edit();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }
  edit(): void {
    const id1 = this.activatedrouter.snapshot.paramMap.get('id');
    if (id1) {
      this.appService.getappdetail(id1).subscribe((i) => {
        this.app1 = i;
        this.updateForm.patchValue({
          user: this.app1?.user,
          app_name: this.app1?.app_name,
          description: this.app1?.description,
          release_date: this.getCurrentDate(),
          version: this.app1?.version,
          genre: this.app1?.genre,
          visibility: this.app1?.visibility,
          downloadCount: this.app1?.downloadCount,
          averageRating: this.app1?.averageRating,
          imageurl: this.app1?.imageurl,
          comments: this.app1?.comments,
        });
      });
    }
  }

  save(): void {
    if (this.updateForm.valid) {
      const id1 = this.activatedrouter.snapshot.paramMap.get('id');
      if (id1 !== null) {
        const updatedApp = {
          id: id1,
          ...this.updateForm.value,
        };
        console.log(id1);
        this.appService.updateapp(updatedApp).subscribe(() => {
          this.show = true;
          this.router.navigate(['/home']);
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
