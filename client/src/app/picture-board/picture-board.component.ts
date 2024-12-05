import { Component, Input, OnInit } from '@angular/core';
import { ImageService, Image, Pagination } from './../image.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, Observable, map, forkJoin } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

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
  pageSizeOptions = [25, 50, 75];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  page = {
    page: 0,
    limit: 25,
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
    this.getImages(this.page);

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.onSearch(this.searchQuery, this.page);
    });
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

  getImages(page: Pagination) {
    if (this.searchQuery !== '') {
      this.onSearch(this.searchQuery, this.page);
      return;
    }

    this.imageService
      .getArtWorks(page)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching artworks:', error);
          return of({ pagination: { total: 0 }, data: [] });
        })
      )
      .subscribe((resp) => {
        this.length = resp.pagination.total ? resp.pagination.total : 0;

        const urlChecks = resp.data.map((image: Image) => {
          const id = image.id;
          if (id) {
            const url = `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`;
            return this.checkUrlStatus(url).pipe(
              map((isValid) => ({ isValid, image, url }))
            );
          }
          return of(null);
        });

        forkJoin(urlChecks).subscribe((results) => {
          results.forEach((result) => {
            if (result && result.isValid) {
              const photo: Photo = {
                id: result.image.id,
                url: result.url,
                title: result.image.title,
              };
              this.images.push(photo);
            } else if (result) {
              console.error('Invalid URL:', result.url);
            }
          });
        });
      });
  }

  onSearch(term: string, page: Pagination) {

    this.imageService.searchArtWorks(term, page).subscribe((resp) => {

      resp.data.forEach((image: Image) => {
        this.getImage(image.id);
      });
    });
  }

  handlePageEvent(e: PageEvent) {
    this.images = [];
    this.length = e.length;
    this.page.page = e.pageIndex;
    this.page.limit = e.pageSize;
    if (this.searchQuery !== '') {
      this.onSearch(this.searchQuery, this.page);
    } else {
      this.getImages(this.page);
    }
  }

  getImage(id: number) {
    this.imageService.getArtwork(id.toString()).subscribe(
      (resp) => {
        const data: Image = resp.data;
        if (data.id) {
          const url = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;
          const urlChecks = resp.data.map((image: Image) => {
            const id = image.id;
            if (id) {
              return this.checkUrlStatus(url).pipe(
                map((isValid) => ({ isValid, image, url }))
              );
            }
            return of(null);
          });

          forkJoin(urlChecks).subscribe((results) => {
            resp.forEach(
              (result: {
                isValid: any;
                image: { id: any; title: any };
                url: any;
              }) => {
                if (result && result.isValid) {
                  const photo: Photo = {
                    id: result.image.id,
                    url: result.url,
                    title: result.image.title,
                  };
                  this.images.push(photo);
                } else if (result) {
                  console.error('Invalid URL:', result.url);
                }
              }
            );
          });

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
