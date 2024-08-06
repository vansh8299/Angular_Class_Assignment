import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../../features/interface';
import moment from 'moment';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DatePipe, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import * as jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-task',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  form!: FormGroup;
  list: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      startDate: new Date('2023-09-03'),
      endDate: new Date('2023-09-03'),
      startTime: '08:00',
      endTime: '12:00',
      duration: '4 hours 0 minutes',
    },
    {
      id: 2,
      name: 'Task 2',
      startDate: new Date('2023-05-04'),
      endDate: new Date('2023-05-04'),
      startTime: '10:00',
      endTime: '14:00',
      duration: '4 hours 0 minutes',
    },
    {
      id: 3,
      name: 'Task 3',
      startDate: new Date('2023-05-01'),
      endDate: new Date('2023-06-01'),
      startTime: '11:00',
      endTime: '14:00',
      duration: '3 hours 0 minutes',
    },
    {
      id: 4,
      name: 'Task 4',
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-07-01'),
      startTime: '09:00',
      endTime: '11:00',
      duration: '2 hours 0 minutes',
    },
  ];
  displayedColumns: string[] = [
    'name',
    'startDate',
    'startTime',
    'endDate',
    'endTime',
    'duration',
    'actions',
  ];
  dataSource = new MatTableDataSource<Task>(this.list);
  editingTaskId: number | null = null;
  filterForm!: FormGroup;
  editingField: string | null = null;
  minEndDate: Date | null = null;
  isTaskFormVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      startDate: [''],
    });
    this.form = this.fb.group({
      name: ['', Validators.required],
      startDate: [null, Validators.required],
      startTime: ['', Validators.required],

      endDate: [null, Validators.required],
      endTime: ['', Validators.required],
      duration: [{ value: '', disabled: true }],
    });

    this.form.get('startDate')?.valueChanges.subscribe(() => {
      this.calculateDuration();
    });

    this.form.get('startTime')?.valueChanges.subscribe(() => {
      this.calculateDuration();
    });

    this.form.get('endDate')?.valueChanges.subscribe(() => {
      this.calculateDuration();
    });

    this.form.get('endTime')?.valueChanges.subscribe(() => {
      this.calculateDuration();
    });
  }
  applyFilter() {
    const filterValue = this.filterForm.get('startDate')?.value;

    if (filterValue) {
      const filteredDate = moment(filterValue).startOf('day');

      this.dataSource.data = this.list.filter((task) =>
        moment(task.startDate).isSame(filteredDate, 'day')
      );
    } else {
      this.dataSource.data = [...this.list];
    }
  }
  toggleTaskForm() {
    this.isTaskFormVisible = !this.isTaskFormVisible;
  }

  openAddTaskModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      data: this.list,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dataSource.data = [...this.list];
    });
  }

  downloadPDF() {
    const doc = new jsPDF.jsPDF();
    doc.text('Tasks List', 10, 10);

    this.list.forEach((task, index) => {
      doc.text(
        `${task.name} - ${task.startDate.toDateString()} - ${
          task.startTime
        } - ${task.endDate.toDateString()} - ${task.endTime} - ${
          task.duration
        }`,
        10,
        20 + index * 10
      );
    });

    doc.save('tasks.pdf');
  }

  downloadExcel() {
    const worksheet = XLSX.utils.json_to_sheet(
      this.list.map((task) => ({
        Name: task.name,
        'Start Date': task.startDate.toDateString(),
        'Start Time': task.startTime,
        'End Date': task.endDate.toDateString(),
        'End Time': task.endTime,
        Duration: task.duration,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');

    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(
      new Blob([excelFile], { type: 'application/octet-stream' }),
      'tasks.xlsx'
    );
  }

  addTask() {
    if (this.form.valid) {
      const newTask: Task = {
        id: this.list.length + 1,
        name: this.form.get('name')?.value,
        startDate: this.form.get('startDate')?.value,
        startTime: this.form.get('startTime')?.value,
        endDate: this.form.get('endDate')?.value,
        endTime: this.form.get('endTime')?.value,
        duration: this.calculateDuration(),
      };
      this.list.push(newTask);
      this.dataSource.data = this.list;
      this.form.reset();
      this.snackBar.open('Task added successfully!', 'Close', {
        duration: 3000,
      });
    }
  }

  startEdit(taskId: number, field: string) {
    this.editingTaskId = taskId;
    this.editingField = field;
  }

  onStartDateChange(startDate: Date) {
    this.minEndDate = startDate;
    this.form.get('endDate')?.setValue(null);
  }
  updateTaskDuration(task: Task) {
    const index = this.list.findIndex((t) => t.id === task.id);
    if (index > -1) {
      this.list[index].duration = this.calculateDurationForTask(task);
      this.dataSource.data = [...this.list];
    }
  }
  saveEdit(task: Task, field: string, value: any) {
    const index = this.list.findIndex((t) => t.id === task.id);
    const originalValue = task[field as keyof Task];

    if (index > -1) {
      if (field === 'startDate' && task.endDate && value > task.endDate) {
        alert('End date cannot be before start date.');
        return;
      }
      if (field === 'endDate' && task.startDate && value < task.startDate) {
        alert('End date cannot be before start date.');
        return;
      }

      (this.list[index] as any)[field] = value;

      const newDuration = this.calculateDurationForTask(this.list[index]);
      if (newDuration === '') {
        (this.list[index] as any)[field] = originalValue;
        return;
      }

      this.list[index].duration = newDuration;

      if (field === 'startDate') {
        this.minEndDate = value;
      }

      if (field === 'startTime' || field === 'endTime') {
        this.list[index].duration = this.calculateDurationForTask(
          this.list[index]
        );
      }
    }
    this.dataSource.data = this.list;
    this.editingTaskId = null;
    this.editingField = null;
    this.snackBar.open('Task updated successfully!', 'Close', {
      duration: 3000,
    });
  }

  calculateDurationForTask(task: Task): string {
    const start = moment(task.startDate)
      .startOf('day')
      .add(moment.duration(task.startTime));
    const end = moment(task.endDate)
      .startOf('day')
      .add(moment.duration(task.endTime));
    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    if (duration.asHours() > 24) {
      this.snackBar.open('Duration cannot be more than 24 hours.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
      return '';
    }

    return `${hours} hours ${minutes} minutes`;
  }

  calculateDuration(): string {
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    if (startDate && endDate) {
      const start = moment(startDate)
        .startOf('day')
        .add(moment.duration(this.form.get('startTime')?.value));
      const end = moment(endDate)
        .startOf('day')
        .add(moment.duration(this.form.get('endTime')?.value));
      const duration = moment.duration(end.diff(start));
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();

      if (duration.asHours() > 24) {
        this.snackBar.open('Duration cannot be more than 24 hours.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        return '';
      }

      const formattedDuration = `${hours} hours ${minutes} minutes`;
      this.form.get('duration')?.setValue(formattedDuration);
      return formattedDuration;
    }

    return '';
  }
  removeData(taskId: number) {
    const index = this.list.findIndex((task) => task.id === taskId);
    if (index > -1) {
      this.list.splice(index, 1);
      this.dataSource.data = this.list;
      this.snackBar.open('Task deleted successfully!', 'Close', {
        duration: 3000,
      });
    }
  }
  // convertTasksToCSV(tasks: Task[]): string {
  //   const header = 'Task Name,Start Date,End Date,Start Time,End Time,Duration';
  //   const rows = tasks.map((task) =>
  //     [
  //       task.name,
  //       moment(task.startDate).format('YYYY-MM-DD'),
  //       moment(task.endDate).format('YYYY-MM-DD'),
  //       task.startTime,
  //       task.endTime,
  //       task.duration,
  //     ].join(',')
  //   );
  //   return [header, ...rows].join('\n');
  // }

  // emailTaskList(): void {
  //   const tasks = this.dataSource.data;
  //   const csvContent = this.convertTasksToCSV(tasks);

  //   const templateParams = {
  //     to_email: 'recipient@example.com',
  //     from_name: 'Your Name',
  //     subject: 'Task List',
  //     message: `Please find the task list below:\n\n${csvContent}`, // Attach CSV content in the message
  //   };

  //   emailjs
  //     .send(
  //       'your_service_id',
  //       'your_template_id',
  //       templateParams,
  //       'your_public_key'
  //     )
  //     .then((response) => {
  //       console.log('Email sent successfully:', response);
  //       this.snackBar.open('Email sent successfully!', 'Close', {
  //         duration: 3000,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Error sending email:', error);
  //       this.snackBar.open('Failed to send email.', 'Close', {
  //         duration: 3000,
  //       });
  //     });
  // }

  cancelEdit() {
    this.editingTaskId = null;
    this.editingField = null;
  }
}
