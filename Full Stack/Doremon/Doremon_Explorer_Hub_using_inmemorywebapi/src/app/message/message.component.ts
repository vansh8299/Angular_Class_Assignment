import { Component } from '@angular/core';
import { MessageserviceService } from '../messageservice.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  constructor(public messageService: MessageserviceService) {}
}
