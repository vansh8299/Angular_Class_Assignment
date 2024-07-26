import { Location, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { appInterface } from '../../../features/appinterface';
import { ApplicationsService } from '../../../core/services/applications.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SuccessmessageComponent } from '../../../features/successmessage/successmessage.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from '../../../features/loader/loader.component';

@Component({
  selector: 'app-updateapp',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    LoaderComponent,
  ],
  templateUrl: './updateapp.component.html',
  styleUrl: './updateapp.component.css',
})
export class UpdateappComponent {
  apps?: appInterface;
  updateForm!: FormGroup;
  showLoader: boolean = false;
  imageSrc: string | ArrayBuffer | null = null;

  get name() {
    return this.updateForm.get('name');
  }
  get description() {
    return this.updateForm.get('description');
  }

  get imageurl() {
    return this.updateForm.get('imageurl');
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private appService: ApplicationsService,
    private router: Router,
    private activatedrouter: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [''],
      description: [''],

      imageurl: [''],
    });
    this.edit();
  }
  edit(): void {
    const id1 = Number(this.activatedrouter.snapshot.paramMap.get('id'));
    if (id1) {
      this.appService.getdetail(id1).subscribe((i) => {
        this.apps = i;
        this.updateForm.patchValue({
          name: this.apps?.name,
          description: this.apps?.description,
          imageurl: this.apps?.imageurl,
        });
      });
    }
  }
  save(): void {
    if (this.updateForm.valid) {
      const id1 = this.activatedrouter.snapshot.paramMap.get('id');
      if (id1 !== null) {
        const updatedapp = {
          id: +id1,
          ...this.updateForm.value,
        };
        console.log(id1);
        this.appService.update(updatedapp).subscribe(() => {
          this.showLoader = true;
          setTimeout(() => {
            this.showLoader = false;
            this.dialog.open(SuccessmessageComponent, {
              data: { message: 'Application updated Successfully' },
            });
            this.router.navigate(['/dashboard']);
          }, 3000);
        });
      }
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      var reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = (event: any) => {
        this.updateForm.patchValue({
          imageurl: event.target.result,
        });
      };
    }
  }
  goBack(): void {
    this.location.back();
  }
}
