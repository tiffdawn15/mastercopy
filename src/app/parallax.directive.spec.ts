import { TestBed } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';
import { ParallaxDirective } from './parallax.directive';

describe('ParallaxDirective', () => {
  let directive: ParallaxDirective;

  beforeEach(() => {
    const elementRefStub = new ElementRef(document.createElement('div'));
    const rendererStub = jasmine.createSpyObj('Renderer2', ['setStyle']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, useValue: elementRefStub },
        { provide: Renderer2, useValue: rendererStub },
      ],
    });

    const elementRef = TestBed.inject(ElementRef);
    const renderer = TestBed.inject(Renderer2);

    directive = new ParallaxDirective(elementRef, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});