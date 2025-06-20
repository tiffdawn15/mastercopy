import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, Router } from "@angular/router";
import {
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
} from "@angular/common/http";
import { Observable, map, catchError, of } from "rxjs";

import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"; // Import spinner module
import { ImageService, Image, Pagination } from "./../image.service";

export interface Photo {
  id: number;
  imageId: number;
  url: string;
  title: string;
}

@Component({
  selector: "app-picture-board",
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
  templateUrl: "./picture-board.component.html",
  styleUrl: "./picture-board.component.css",
})
export class PictureBoardComponent implements OnInit {
  @Input() searchQuery: string = "";

  images: Photo[] = [];
  length = 50;
  isLoading: boolean = true;
  hidePageSize = false;
  pageSizeOptions = [50, 75, 100];
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  page = {
    page: 0,
    limit: 50,
  };
  paginator: any;

  constructor(
    private http: HttpClient,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.images = [];
    this.getImages(this.page);
  }

  ngOnInit() {
    this.getImages(this.page);

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params["q"];
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
        if (image.image_id) {
          const url = `https://www.artic.edu/iiif/2/${image.image_id}/full/843,/0/default.jpg`;

          this.checkUrlStatus(url).subscribe((isValid) => {
            if (isValid) {
              const photo: Photo = {
                id: image.id,
                imageId: image.image_id,
                url: url,
                title: image.title,
              };
              this.images.push(photo);
            }
          });
        }
      });
      this.isLoading = false;
    });
  }

  onSearch(term: string, page: Pagination) {
    this.images = [];
    this.imageService.searchArtWorks(term, page).subscribe((resp) => {
      resp.data.forEach((image: Image) => {
        this.getImage(image.id);
      });
    });
  }

  handlePageEvent(e: PageEvent) {
    this.isLoading = true;
    this.images = [];
    this.length = e.length;
    this.page.page = e.pageIndex;
    this.page.limit = e.pageSize;

    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params["q"];
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
        if (data.image_id) {
          const url = `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`;

          const photo: Photo = {
            id: id,
            imageId: data.image_id,
            url: url,
            title: data.title,
          };
          this.images.push(photo);
        }
      },
      (error) => {
       this.handleError(error);
      }
    );
  }

  onClick(image: Photo, id: number) {
    console.log('image', image);
    this.router.navigate([`/artwork/${id}`]);
  }

  checkUrlStatus(url: string): Observable<boolean> {
    return this.http
      .get(url, { observe: "response", responseType: "text" })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status === 200;
        }),
        catchError((error: HttpErrorResponse) => {
          return of(false);
        })
      );
  }

  handleError(error: any): void {
    this.snackBar.open('An error occurred: ' + error.message, 'Close', {
      duration: 5000, 
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });

    console.error('Error', error); 
  }
}
