import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MatCardModule } from '@angular/material/card';
import { Users } from '../users';
import { map, Observable } from 'rxjs';

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

  id = '';
  profileJson = '';
  name = '';
  email = '';

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
 

  }



  homePage(): void {
    this.router.navigate(['/']);
  }
}
