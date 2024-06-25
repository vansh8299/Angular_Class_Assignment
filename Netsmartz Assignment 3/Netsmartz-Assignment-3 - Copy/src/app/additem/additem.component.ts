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
  get id() {
    return this.itemForm.get('id');
  }
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
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required]],
    });
  }

  add() {
    if (this.itemForm.valid) {
      const { id, name, description, price } = this.itemForm.value;
      this.itemService
        .additem({
          id,
          name,
          description,
          price,
        })
        .subscribe((item: iteminterface) => {
          this.items.push(item), this.router.navigate(['/home']);
        });
    }
  }

  goback(): void {
    this.location.back();
  }

  onSubmit() {
    this.add();
  }
}
