import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(
    private http: HttpClient
  ) { }

  apply(career){
    return this.http.post(`${baseUrl}`, career,{ responseType: 'text' });
  }
}
