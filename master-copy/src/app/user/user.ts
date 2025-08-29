import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  user$ = {}
  profileJson = '';

  constructor(public auth: AuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.user$;
    this.auth.user$.subscribe((user) => {
      console.log(user);
      if (user) {
        console.log('Name:', user.name);
        console.log('Email:', user.email);
      } else {
        console.log('User is not authenticated.');
      }
    });
  }
}
