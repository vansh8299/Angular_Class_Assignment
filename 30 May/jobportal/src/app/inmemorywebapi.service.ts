import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { JobInterface } from './jobinterface';

@Injectable({
  providedIn: 'root',
})
export class InmemorywebapiService implements InMemoryDbService {
  createDb() {
    const jobs = [
      {
        id: 1,
        company_name: 'Tech Innovators Inc.',
        job_title: 'Software Engineer',
        openings: 5,
      },
      {
        id: 2,
        company_name: 'Health Solutions Ltd.',
        job_title: 'Data Analyst',
        openings: 3,
      },
      {
        id: 3,
        company_name: 'Creative Minds Agency',
        job_title: 'Graphic Designer',
        openings: 2,
      },
      {
        id: 4,
        company_name: 'Finance Experts Group',
        job_title: 'Financial Advisor',
        openings: 4,
      },
    ];
    return { jobs };
  }
  genId(jobs: JobInterface[]): number {
    return jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1;
  }
}
