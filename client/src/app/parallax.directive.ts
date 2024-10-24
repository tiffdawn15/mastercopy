import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective {
  @Input('ratio') parallaxRatio: number = 1;
  initialTop: number = 0;

  constructor(private eleRef: ElementRef, 
    private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const element = this.eleRef.nativeElement;
    if (element && typeof element.getBoundingClientRect === 'function') {
      const scrollPosition = window.pageYOffset;
      const parallaxOffset = scrollPosition * this.parallaxRatio;
      this.renderer.setStyle(
        element,
        'transform',
        `translateY(${parallaxOffset}px)`
      );
    } else {
      console.error('Element does not support getBoundingClientRect:', element);
    }
  }
}
