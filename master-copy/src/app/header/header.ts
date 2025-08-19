import { Component, EventEmitter, Output } from '@angular/core';
import { Image } from '../image';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-header',
  imports: [
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery: string = '';

  constructor(private imageService: Image, private router: Router) {
 
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }
}
