import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Image {
  image_id: number;
  name: string;
  aliases: string[];
  alt_image_ids: string[];
}

export interface ImageObject {
  // config: number;
  data: Image[];
  category_titles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  // Sample image url
  getArtworks = 'https://api.artic.edu/api/v1/artworks';
  search = 'https://api.artic.edu/api/v1/artworks/search?q=monet';

  constructor(private http: HttpClient) {}

  getArtWorks() {
    return this.http.get<ImageObject>(this.getArtworks);
  }
  
}
