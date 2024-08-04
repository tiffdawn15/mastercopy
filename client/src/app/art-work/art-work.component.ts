import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { ImageService } from './../image.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-art-work',
  standalone: true,
  imports: [],
  templateUrl: './art-work.component.html',
  styleUrl: './art-work.component.css',
})
export class ArtWorkComponent {
  id = '';
  image: string = '';
  title: string = '';
  artist: string = '';
  url: string = '';

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id}')!;
    this.getImage();

 
  }

  getImage() {
    console.log(this.id);
    this.imageService.getArtwork(this.id).subscribe((resp) => {
      console.log(resp);
      this.url = `https://www.artic.edu/iiif/2/${resp.data.image_id}/full/843,/0/default.jpg`;
      console.log(this.image);
      this.title = resp.data.title;
      this.artist = resp.data.artist_title;
    });
  }
}
