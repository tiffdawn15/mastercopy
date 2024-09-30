import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { ImageService } from './../image.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-art-work',
  standalone: true,
  imports: [MatIconModule, 
    HeaderComponent
  ],
  templateUrl: './art-work.component.html',
  styleUrl: './art-work.component.css',
})
export class ArtWorkComponent {
  id = '';
  title: string = '';
  artist: string = '';
  url: string = '';
  artist_display: string = '';
  artwork_type_title: string = '';
  category_titles: string = '';
  date_end: string = '';
  department_title: string = '';
  medium_display: string = '';
  placeOfOrigin: string = '';
  provenance_text: string = '';

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id}')!;
    this.getImage();
  }

  getImage() {
    this.imageService.getArtwork(this.id).subscribe((resp) => {
      this.url = `https://www.artic.edu/iiif/2/${resp.data.image_id}/full/843,/0/default.jpg`;
      this.title = resp.data.title;
      this.artist = resp.data.artist_title;
      this.artist_display = resp.data.artist_display;
      this.artwork_type_title = resp.data.artwork_type_title;
      this.category_titles = resp.data.category_titles.join(', ');
      this.date_end = resp.data.date_end;
      this.department_title = resp.data.department_title;
      this.medium_display = resp.data.medium_display;
      this.placeOfOrigin = resp.data.place_of_origin;
      this.provenance_text = resp.data.provenance_text;
    });
  }

  goToHomePage() {
    console.log('clicked')
    this.router.navigate(['/']);
  }

  onSearch(term: string) {
    console.log(term);

    // TODO: Implement this function
    
  }
}
