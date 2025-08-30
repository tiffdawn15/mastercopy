import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';

@Injectable({
  providedIn: 'root',
})
export class Users {
  //   curl -L -g 'https://{tenantDomain}/api/v2/users/:id' \
  // -H 'Accept: application/json'
  constructor(private http: HttpClient) {}

  /**
   * Fetches user information from Auth0.
   * @param userId The ID of the user to fetch.
   * @returns Observable containing user information.
   */
  getUser(userId: string): Observable<any> {
    const url = `https://${process.env['AUTH0_DOMAIN']}/api/v2/users/${userId}`;
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.get(url, { headers });
  }
}
