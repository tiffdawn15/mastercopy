import { Component, Input, OnInit } from '@angular/core';
import { ImageService, Image, Pagination } from './../image.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

 export interface Photo {
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
export class PictureBoardComponent implements OnInit {
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

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.images = [];
    const page = {
      page: this.pageIndex,
      limit: this.pageSize,
    };
    this.getImages(page);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.onSearch(this.searchQuery);
    });
    console.log(this.images);
  }

  getImages(page: Pagination) {
    this.images = [];
    this.imageService.getArtWorks(page).subscribe((resp) => {
      this.length = resp.pagination.total ? resp.pagination.total : 0;

      resp.data.forEach((image: Image) => {
        const id = image.id;
        if (id) {
          const url = `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`;
          const photo: Photo = {
            id: id,
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
    this.getImages(page);
  }

  getImage(id: number) {
    const json = this.imageService.getArtwork(id.toString()).subscribe(
      (resp) => {
        const data: Image = resp.data;
        const id = data.id;
        if (id) {
          const url = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;
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

  onClick(image: Photo, id: number) {
    this.router.navigate([`/artwork/${id}`]);
  }
} 
