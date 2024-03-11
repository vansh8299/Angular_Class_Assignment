import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DescriptionseriesService {
  constructor() {}

  descriptions: string[] = [];

  add(description: string): void {
    this.descriptions.push(description);
  }
  clear(): void {
    this.descriptions = [];
  }
}
