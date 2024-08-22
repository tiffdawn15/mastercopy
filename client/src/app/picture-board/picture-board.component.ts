import { Component, Input } from '@angular/core';
import { ImageService, Image, Pagination } from './../image.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

interface Photo {
  id: number;
  url: string;
  title: string;
}

@Component({
  selector: 'app-picture-board',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatPaginatorModule],
  templateUrl: './picture-board.component.html',
  styleUrl: './picture-board.component.css',
})
export class PictureBoardComponent {
  @Input() searchQuery: string = '';

  images: Photo[] = [];
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(private imageService: ImageService, 
    private router: Router
  ) {
    const page = {
      page: this.pageIndex,
      limit: this.pageSize,
    };
    this.getImages(page);
  }

  getImages(page: Pagination) {
    this.images = [];
    this.imageService.getArtWorks(page).subscribe((resp) => {
      this.length = resp.pagination.total ? resp.pagination.total : 0;
  
      resp.data.forEach((image: Image) => {
        const id = image.image_id;
        if (id) {
          const url = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
          const photo: Photo = {
            id: image.id,
            url: url,
            title: image.title,
          };
          this.images.push(photo);
        }
      });
    });
  }

  onSearch(term: string) {
    this.images = [];
    this.imageService.searchArtWorks(term.toString()).subscribe((resp) => {
      this.images = [];

      resp.data.forEach((image: Image) => {
        this.getImage(image.id);
      });
    });
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    const page: Pagination = {
      page: this.pageIndex,
      limit: this.pageSize,
    };
    console.log(page)
    this.getImages(page);
  }

  getImage(id: number) {
    const json = this.imageService.getArtwork(id.toString()).subscribe(
      (resp) => {
        const data: Image = resp.data;
        const id = data.image_id;
        if (id) {
          const url = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
          const photo: Photo = { 
            id: id,
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

  onClick(id: number) {
    this.router.navigate([`/artwork/${id}`]);
  }
}
