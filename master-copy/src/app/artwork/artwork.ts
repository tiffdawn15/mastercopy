import { Component } from '@angular/core';
import { Image } from '../image';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-artwork',
  imports: [
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule, 
     ],
  templateUrl: './artwork.html',
  styleUrl: './artwork.css'
})
export class Artwork {
  id = '';
  title: string = '';
  artist: string = '';
  url: string = '';
  artist_display: string = '';
  artwork_type_title: string = '';
  category_titles: string = '';
  date_end: string = '';
  department_title: string = '';
  isLoading: boolean = true;
  medium_display: string = '';
  placeOfOrigin: string = '';
  provenance_text: string = '';

  constructor(
    private imageService: Image,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id')!;
      this.getImage();
    });

    this.getImage();
  }

  getImage() {
    this.isLoading = true;
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
    this.isLoading = false;

  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
