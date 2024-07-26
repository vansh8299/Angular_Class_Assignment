import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  todoForm!: FormGroup;
  selectedMonth: string = '';
  monthSelected: boolean = false;

  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1000, selected: false },
    { expenseType: 'Light Bills', expenseAmount: 500, selected: false },
  ];

  februaryExpense: any[] = [
    { expenseType: 'Essentials', expenseAmount: 200, selected: false },
    { expenseType: 'Light Bills', expenseAmount: 400, selected: false },
  ];

  marchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1100, selected: false },
    { expenseType: 'Essentials', expenseAmount: 250, selected: false },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', {
      month: 'long',
    });
    this.selectedMonth = currentMonth;
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required],
    });
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      newExpense.selected = false;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryExpense.push(newExpense);
          break;
        case 'February':
          this.februaryExpense.push(newExpense);
          break;
        case 'March':
          this.marchExpense.push(newExpense);
          break;
        default:
          console.log('Invalid Month Selected');
      }
      this.todoForm.reset();
      this.todoForm.patchValue({ month: '' });
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    let totalExpense = 0;
    for (const expense of this.gettodoFormonth(month)) {
      if (!expense.selected) {
        totalExpense += expense.expenseAmount;
      }
    }
    return totalExpense;
  }

  gettodoFormonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  onSave() {
    if (this.todoForm.valid) {
      const incomeData = this.todoForm.value;
      this.todoForm.reset({ month: this.selectedMonth });
    }
  }

  saveForm() {
    console.log('Form saved');
  }

  onBack() {
    this.router.navigate(['/budget-tracker/dashboard']);
  }

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
    this.calculateTotalExpense(this.selectedMonth);
  }
}
