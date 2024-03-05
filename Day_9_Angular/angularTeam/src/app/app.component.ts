import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MemberComponent } from './member/member.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MemberComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'My Angular Team';
}
