import { Component, OnInit } from '@angular/core';
import { EquationService } from '../equation.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-equation-check',
  standalone: true,
  imports: [NgIf],
  templateUrl: './equation-check.component.html',
  styleUrl: './equation-check.component.css',
})
export class EquationCheckComponent {
  randomValue: number | null = null;
  isEquationSatisfied: boolean | null = null;

  constructor(private equationService: EquationService) {}

  ngOnInit(): void {
    this.generateAndCheckValue();
  }

  generateAndCheckValue(): void {
    this.randomValue = this.equationService.generateRandomValue(0, 100);

    this.isEquationSatisfied = this.equationService.checkEquation(
      this.randomValue
    );
  }
}
