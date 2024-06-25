import { Component } from '@angular/core';
import { JobInterface } from '../jobinterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobServiceService } from '../job-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-update-job-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './update-job-form.component.html',
  styleUrls: ['./update-job-form.component.css'],
})
export class UpdateJobFormComponent {
  job1?: JobInterface;
  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private activatedrouter: ActivatedRoute,
    private jobService: JobServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      company_name: ['', [Validators.required, Validators.minLength(3)]],
      job_title: ['', [Validators.required, Validators.minLength(10)]],
      openings: ['', Validators.required],
    });
    this.edit();
  }

  edit(): void {
    const id1 = Number(this.activatedrouter.snapshot.paramMap.get('id'));
    if (id1) {
      this.jobService.getjobdetail(id1).subscribe((job) => {
        this.job1 = job;
        this.updateForm.patchValue({
          company_name: this.job1?.company_name,
          job_title: this.job1?.job_title,
          openings: this.job1?.openings,
        });
      });
    }
  }

  save(): void {
    if (this.updateForm.valid) {
      const id1 = Number(this.activatedrouter.snapshot.paramMap.get('id'));
      if (id1) {
        const updatedJob = {
          id: id1,
          ...this.updateForm.value,
        };
        this.jobService.updatejob(updatedJob).subscribe(() => {
          this.router.navigate(['/jobs']);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
