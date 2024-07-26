import { Component } from '@angular/core';
import { appInterface } from '../../../features/appinterface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApplicationsService } from '../../../core/services/applications.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Location, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SuccessmessageComponent } from '../../../features/successmessage/successmessage.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from '../../../features/loader/loader.component';

@Component({
  selector: 'app-createapp',
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
  templateUrl: './createapp.component.html',
  styleUrl: './createapp.component.css',
})
export class CreateappComponent {
  apps: appInterface[] = [];
  addForm!: FormGroup;
  showLoader: boolean = false;
  imageSrc: string | ArrayBuffer | null = null;

  get name() {
    return this.addForm.get('name');
  }
  get description() {
    return this.addForm.get('description');
  }
  get imageurl() {
    return this.addForm.get('imageurl');
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private appService: ApplicationsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageurl: [''],
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      var reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = (event: any) => {
        this.addForm.patchValue({
          imageurl: event.target.result,
        });
      };
    }
  }

  add() {
    if (this.addForm.valid) {
      const { name, description, imageurl } = this.addForm.value;
      this.appService
        .add({
          name,
          description,
          imageurl,
        })
        .subscribe((app: appInterface) => {
          this.apps.push(app);
          this.showLoader = true;
          setTimeout(() => {
            this.showLoader = false;
            this.dialog.open(SuccessmessageComponent, {
              data: { message: 'Application created Successfully' },
            });
            this.router.navigate(['/dashboard']);
          }, 3000);
        });
    }
  }

  onSubmit() {
    this.add();
  }
  goBack(): void {
    this.location.back();
  }
}
