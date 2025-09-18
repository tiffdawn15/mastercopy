import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../env/env.js"; 
@Injectable({
  providedIn: 'root',
})
/**
 * THIS IS A SERVICE CLASS
 */
export class Users {
  constructor(private http: HttpClient) {}

  /**
   * Fetches user information from Auth0.
   * @param userId The ID of the user to fetch.
   * @returns Observable containing user information.
   */
  getUser(userId: string): Observable<any> {
    const url = `https://${environment.auth0Domain}/userinfo/`;
    console.log(url); 
    const headers = new HttpHeaders({
      Accept: 'application/json',
      access_token: userId
    });

    return this.http.get(url, { headers });
  }
}
