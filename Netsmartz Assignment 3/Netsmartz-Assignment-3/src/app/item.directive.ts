import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[itemHighlight]',
})
export class itemDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
