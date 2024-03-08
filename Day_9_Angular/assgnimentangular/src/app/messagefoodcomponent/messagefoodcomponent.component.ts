import { Component } from '@angular/core';
import { MessagefoodserviceService } from '../messagefoodservice.service';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-messagefoodcomponent',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './messagefoodcomponent.component.html',
  styleUrl: './messagefoodcomponent.component.css',
})
export class MessagefoodcomponentComponent {
  constructor(public messagefoodservice: MessagefoodserviceService) {}
}
