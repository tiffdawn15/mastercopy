import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ParallaxDirective } from '../parallax.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    HeaderComponent, 
    ParallaxDirective
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {


  onSearch(term: string) {
    console.log(term);

    // TODO: Implement this function
    
  }
}
