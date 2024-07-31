import { Component } from '@angular/core';
import { ImageService, Image } from './../image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-picture-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './picture-board.component.html',
  styleUrl: './picture-board.component.css',
})
export class PictureBoardComponent {
  images: string[] = [];

  constructor(private imageService: ImageService) {
    this.getImages();
  }

  getImages() {
    this.imageService.getArtWorks().subscribe((resp) => {
      resp.data.forEach((image: Image) => {
        const id = image.image_id;
        const altImage = image.alt_image_ids[0];

        if (id) {
          const url = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
          this.images.push(url);
        }
      });
    });
  }
}
