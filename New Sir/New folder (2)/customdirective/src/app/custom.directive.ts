import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appCustom]',
  standalone: true,
})
export class CustomDirective implements OnInit {
  @Input() fontSize: string = '';
  @Input() hoverFontSize: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.fontSize = this.fontSize;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.fontSize = this.hoverFontSize;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.fontSize = this.fontSize;
  }
}
