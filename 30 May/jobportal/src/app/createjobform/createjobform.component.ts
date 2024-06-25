import { Component } from '@angular/core';
import { JobInterface } from '../jobinterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { JobServiceService } from '../job-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-createjobform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './createjobform.component.html',
  styleUrl: './createjobform.component.css',
})
export class CreatejobformComponent {
  jobs: JobInterface[] = [];
  jobForm!: FormGroup;
  // show: boolean = false;

  get company_name() {
    return this.jobForm.get('company_name');
  }

  get job_title() {
    return this.jobForm.get('job_title');
  }

  get openings() {
    return this.jobForm.get('openings');
  }

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private jobService: JobServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.jobForm = this.fb.group({
      company_name: ['', [Validators.required, Validators.minLength(3)]],
      job_title: ['', [Validators.required, Validators.minLength(5)]],
      openings: ['', [Validators.required]],
    });
  }

  add(company_name: string, job_title: string, openings: string) {
    company_name = company_name.trim();
    job_title = job_title.trim();
    if (!company_name && !job_title) {
      return;
    }
    this.jobService
      .addjob({ company_name, job_title, openings } as JobInterface)
      .subscribe((i) => this.jobs.push(i));
    this.router.navigate(['/jobs']);
  }

  goback(): void {
    this.location.back();
  }
}
