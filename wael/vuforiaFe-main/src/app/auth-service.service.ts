import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {baseUrl} from '../environments/environment';
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {
  }

  login(data): Observable<boolean> {
    return this.http.post<{ token: string }>(`${baseUrl}/api/auth`, data)
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  /* The other code is omitted for the brevity */
  get getToken() {
    return localStorage.getItem('authToken');
  }
}
