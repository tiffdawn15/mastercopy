import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pagination {
  page: number;
  limit: number;
  total?: number;
}
export interface Image {
  id: number;
  image_id: number;
  title: string;
  aliases: string[];
  alt_image_ids: string[];
  description: string;
}

export interface ImageObject {
  data: Image[];
  category_titles: string[];
  pagination: Pagination;
}

export interface ImageData {
  data: Image;
}

@Injectable({
  providedIn: 'root',
})
export class Image {
  constructor(private http: HttpClient) {}

  getArtWorks(page: Pagination) {
    let getArtworks = `https://api.artic.edu/api/v1/artworks?page=${page.page}&limit=${page.limit}`;
    return this.http.get<ImageObject>(getArtworks);
  }

  searchArtWorks(term: string, page: Pagination) {
    let searchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${term}?page=${page.page}&limit=${page.limit}`;
    return this.http.get<ImageObject>(searchUrl);
  }

  getArtwork(id: string) {
    let artworkUrl = `https://api.artic.edu/api/v1/artworks/${id}`;
    return this.http.get<any>(artworkUrl);
  }

  saveArtwork(id: string) {
    let url = 'localhost:8080/api/collections/'
  }
}
