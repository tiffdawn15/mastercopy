import { Component, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { ImageService } from '../image.service';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-header',
    imports: [   MatChipsModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      FormsModule,
      RouterLink,],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery: string = '';

  constructor(private imageService: ImageService, 
    private router: Router) {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }
}
