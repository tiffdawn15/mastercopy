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
  //   curl -L -g 'https://{tenantDomain}/api/v2/users/:id' \
  // -H 'Accept: application/json'
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


// var myHeaders = new Headers();
// myHeaders.append("Accept", "application/json");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("https://{yourDomain}/userinfo", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));