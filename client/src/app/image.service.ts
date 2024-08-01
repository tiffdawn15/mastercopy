import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Image {
  id: number;
  image_id: number;
  title: string;
  aliases: string[];
  alt_image_ids: string[];
  description: string;
}

export interface ImageObject {
  // config: number;
  data: Image[];
  category_titles: string[];
}

export interface ImageData {
  data: Image;
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

  searchArtWorks(term: string){
   let searchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${term}`;
   return this.http.get<ImageObject>(searchUrl);
  }

  getArtwork(id: number){
    let artworkUrl = `https://api.artic.edu/api/v1/artworks/${id}`;
    return this.http.get<any>(artworkUrl);
  }

}
