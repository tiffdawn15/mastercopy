import { Component, Input, OnInit } from '@angular/core';
import { ImageService, Image, Pagination } from './../image.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

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
  pageSizeOptions = [50, 75, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  page = {
    page: 0,
    limit: 50,
  };

  constructor(
    private http: HttpClient,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.images = [];
  
    this.getImages(this.page);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      if (this.searchQuery) {
        this.onSearch(this.searchQuery, this.page);
      } else {
        this.getImages(this.page);
      }
    });
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

  onSearch(term: string, page: Pagination) {
    this.images = [];
    if(term){
      this.imageService
      .searchArtWorks(term.toString(), page)
      .subscribe((resp) => {
        this.images = [];

        resp.data.forEach((image: Image) => {
          this.getImage(image.id);
        });
      });
    } else {
      // this.getImages(page);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.page.page = e.pageIndex;
    this.page.limit = e.pageSize;

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['searchQuery'];
      if (this.searchQuery) {
        this.onSearch(this.searchQuery, this.page);
      } else {
        this.getImages(this.page);
      }
    });
  }

  getImage(id: number) {
    this.imageService.getArtwork(id.toString()).subscribe(
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

  checkUrlStatus(url: string): Observable<boolean> {
    return this.http
      .get(url, { observe: 'response', responseType: 'text' })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status === 200;
        }),
        catchError((error: HttpErrorResponse) => {
          return of(false);
        })
      );
  }
}
