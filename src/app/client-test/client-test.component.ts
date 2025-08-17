import { afterNextRender, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-client-test',
    imports: [],
    templateUrl: './client-test.component.html',
    styleUrl: './client-test.component.css'
})
export class ClientTestComponent {
  @ViewChild('content')
  contentRef!: ElementRef;

  constructor() {
    afterNextRender(() => {
      console.log( window.location.origin);
      
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      console.log('content height: ' + this.contentRef.nativeElement.scrollHeight);
    });
  }

}
