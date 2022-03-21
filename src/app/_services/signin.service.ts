import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<any>{
    const loginData: FormData = new FormData();
    loginData.append('email', email);
    loginData.append('password', password);
    console.log("logindata ",loginData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      })
    };
    return this.http.post(`https://admin.toothpickdentalstaff.com/api/userLogin`, loginData);
  }

  // signin(username: string, password: string): Observable<any>{
  //   const loginData: FormData = new FormData();
  //   loginData.append('username', username);
  //   loginData.append('password', password);
  //   return this.http.get(`${baseUrl}userLogin`);
  // }

}
