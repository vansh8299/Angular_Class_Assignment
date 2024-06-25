import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
  };

  onSubmit() {
    console.log('Register Data:', this.registerData);
  }
}
