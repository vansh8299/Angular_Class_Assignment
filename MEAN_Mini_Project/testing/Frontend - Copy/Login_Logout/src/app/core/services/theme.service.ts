import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = 'light-theme';

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      document.body.classList.add(this.currentTheme);
    } else {
      document.body.classList.add(this.currentTheme);
    }
  }

  setTheme(theme: string) {
    document.body.classList.replace(this.currentTheme, theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  getTheme(): string {
    return this.currentTheme;
  }

  toggleTheme() {
    const newTheme =
      this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }
}
