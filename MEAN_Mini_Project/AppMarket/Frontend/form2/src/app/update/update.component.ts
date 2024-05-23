import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbModalModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateComponent {
  updateForm!: FormGroup;
  show: boolean = false;
  closeResult = '';

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      AppName: ['IRCTC Railway', Validators.required],
      description: ['Online Ticket Booking Platform', Validators.minLength(10)],
      releasedate: [this.getCurrentDate()],
      version: ['1.0'],
      avgrating: ['4'],
      downloadCount: ['6'],
      genre: [''],
      visibility: [''],
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
  }

  open(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'modal-backdrop-highlighted',
    });

    modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  onSubmit() {
    console.log(this.updateForm.value);
    this.show = true;
    this.updateForm.reset();
  }
}
