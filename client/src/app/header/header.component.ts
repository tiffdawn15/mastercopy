import { ImageService } from './../image.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery: string = '';

  constructor(private imageService: ImageService, 
    private router: Router) {}

  search(): void {
    if (this.searchQuery) {
      this.searchEvent.emit(this.searchQuery.trim());

      console.log(this.searchQuery);
    }
  }

  // onSearch(term: string) {
  //   this.imageService.searchArtWorks(term.toString()).subscribe((resp) => {
  //     this.images = [];

  //     resp.data.forEach((image: Image) => {
  //       this.getImage(image.id);
  //     });
  //   });
  // }

}
