import { Component, Inject, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FloatLabelType } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ThemePalette } from '@angular/material/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  firstFormGroup = this._formBuilder.group({
    Name: ['', Validators.required],
    age: ['', Validators.required],

    gender: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    description: ['', Validators.required],
    Starting_Date: ['', Validators.required],
    Ending_Date: ['', Validators.required],
    Theme: ['', Validators.required],
  });
  ThirdFormGroup = this._formBuilder.group({
    FeedBack: ['', Validators.required],
  });
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  colorControl = new FormControl('primary' as ThemePalette);
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = '';
  isLinear = false;
  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
  open() {
    const formData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.ThirdFormGroup.value,
    };

    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: formData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogContentExampleDialog {
  durationInSeconds = 5;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  templateUrl: './snack.html',
  styles: `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}
