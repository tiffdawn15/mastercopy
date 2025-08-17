import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ParallaxDirective } from '../parallax.directive';

@Component({
    selector: 'app-explore',
    imports: [
        HeaderComponent,
        ParallaxDirective,
    ],
    templateUrl: './explore.component.html',
    styleUrl: './explore.component.css'
})
export class ExploreComponent {
  onSearch(term: string) {
    // TODO: Implement this function
    // TODO: Go back to home page with the search functionality. Will need to refactor probably

    // this.images = [];
    // this.imageService.searchArtWorks(term.toString()).subscribe((resp) => {
    //   this.images = [];

    //   resp.data.forEach((image: Image) => {
    //     this.getImage(image.id);
    //   });
    // });
  }
}
