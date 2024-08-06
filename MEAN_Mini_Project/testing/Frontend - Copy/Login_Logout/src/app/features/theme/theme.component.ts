import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
})
export class ThemeComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
