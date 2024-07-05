// src/app/equation.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EquationService {
  generateRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  checkEquation(value: number): boolean {
    return value * value - 20 * value + 20 === 0;
  }
}
