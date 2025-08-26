import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { concatMap, map, tap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [
    CommonModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit{
  metadata = {};

  constructor(public auth: AuthService,
    private http: HttpClient
  ){}

  ngOnInit(): void {
    // this.auth.user$
    // .pipe(
    //   concatMap((user) =>
    //     // Use HttpClient to make the call
    //     this.http.get(
    //       encodeURI(`https://dev-fyfv8uggeoexkhf5.us.auth0.com/api/v2/users/${user?.sub}`)
    //     )
    //   ),
    //   map((user: any) => user.user_metadata),
    //   tap((meta) => (this.metadata = meta))
    // )
    // .subscribe();
  }
}
