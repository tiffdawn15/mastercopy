import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [CommonModule, MatCardModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  private auth = inject(AuthService);
  user$ = this.auth.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));

  constructor(private router: Router) {}

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user) {
        localStorage.setItem('userToken', user?.sub || '');
      }
    });
  }

  homePage(): void {
    this.router.navigate(['/']);
  }
}
