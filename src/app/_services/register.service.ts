import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { Staff } from '../_models/staff';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  register(signupform){
    return this.http.post(`${baseUrl}registerUser`, signupform);
  }

  getStaffs(): Observable<Staff>{
    return this.http.get<Staff>(`${baseUrl}register`);
  }

}
