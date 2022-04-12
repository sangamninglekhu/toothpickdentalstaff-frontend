import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';
import { UserModel } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private http: HttpClient
  ) {
    console.log('this is the user: ',this.userDetail(localStorage.getItem("TDS_auth")));
  }

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

  userDetail(token: string): Observable<any>{
    console.log("userDetails ",token);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${baseUrl}userDetails`, {headers: headers});
  }

}
