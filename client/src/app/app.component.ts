import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PictureBoardComponent } from './picture-board/picture-board.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    HeaderComponent, 
    PictureBoardComponent,
    RouterModule, 
    RouterLink, 
    RouterLinkActive, 
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Mumbos-Big-Jumbo';
  searchQuery: string = '';

 
}
