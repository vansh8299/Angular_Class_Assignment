import { Component } from '@angular/core';
import { JobInterface } from '../jobinterface';
import { JobServiceService } from '../job-service.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  jobs: JobInterface[] = [];

  constructor(private jobService: JobServiceService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((job) => {
      this.jobs = job;
    });
  }

  delete(job: JobInterface): void {
    if (job.id !== undefined) {
      this.jobs = this.jobs.filter((j) => j !== job);
      this.jobService.deletejob(job.id).subscribe();
    }
  }
}
