import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { iteminterface } from '../iteminterface';
import { ItemserviceService } from '../itemservice.service';
@Component({
  selector: 'app-additem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './additem.component.html',
  styleUrl: './additem.component.css',
})
export class AdditemComponent {
  items: iteminterface[] = [];
  itemForm!: FormGroup;

  get name() {
    return this.itemForm.get('name');
  }

  get description() {
    return this.itemForm.get('description');
  }

  get price() {
    return this.itemForm.get('price');
  }
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private itemService: ItemserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required]],
    });
  }

  add(name: string, description: string, price: string) {
    name = name.trim();
    description = description.trim();
    if (!name && !description) {
      return;
    }
    this.itemService
      .additem({ name, description, price } as iteminterface)
      .subscribe((i) => this.items.push(i));
    this.router.navigate(['/home']);
  }

  goback(): void {
    this.location.back();
  }
}
