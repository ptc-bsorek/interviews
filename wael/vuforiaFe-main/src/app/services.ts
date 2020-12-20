import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseUrl} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(private http: HttpClient) {
  }

  public getGallery(): Observable<ManageResponse> {
    return this.http.get <ManageResponse>(`${baseUrl}/api/jobs`);
  }

  public addJob(data): Observable<ManageResponse> {
    return this.http.post <ManageResponse>(`${baseUrl}/api/jobs`, data);
  }
}

class ManageResponse {
   error?: string;
   results?: any;
 }
