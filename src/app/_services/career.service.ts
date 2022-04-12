import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Career } from '../_models/career';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(
    private http: HttpClient
  ) { }

  getJobs(): Observable<any>{
    return this.http.get<any>(`${baseUrl}careerOpportunities`);
  }

  apply(career){
    return this.http.post(`${baseUrl}`, career,{ responseType: 'text' });
  }
}
