import { Component } from '@angular/core';
import { ImageService, Image } from './../image.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
interface Photo {
  url: string;
  title: string;
}
@Component({
  selector: 'app-picture-board',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './picture-board.component.html',
  styleUrl: './picture-board.component.css',
})
export class PictureBoardComponent {
  images: Photo[] = [];

  constructor(private imageService: ImageService) {
    this.getImages();
  }

  getImages() {
    this.imageService.getArtWorks().subscribe((resp) => {
      resp.data.forEach((image: Image) => {
        const id = image.image_id;
        if (id) {
          const url = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
          const photo: Photo = {
            url: url,
            title: image.title,
          };
          this.images.push(photo);
        }
      });
    });
  }

  onSearch(term: string) {
    this.imageService.searchArtWorks(term.toString()).subscribe((resp) => {
      console.log(resp);
      this.images = [];

      resp.data.forEach((image: Image) => {
        this.getImage(image.id);
      });
    });
  }

  getImage(id: number) {
    const json = this.imageService.getArtwork(id).subscribe(
      (resp) => {
        console.log(resp);
        const data: Image = resp.data;
        const id = data.image_id;
        if (id) {
          const url = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
          const photo: Photo = {
            url: url,
            title: data.title,
          };
          this.images.push(photo);
        }
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
