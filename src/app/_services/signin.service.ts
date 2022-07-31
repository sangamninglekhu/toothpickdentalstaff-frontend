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
  }

  login(email: string, password: string): Observable<any>{
    const loginData: FormData = new FormData();
    loginData.append('email', email);
    loginData.append('password', password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      })
    };
    return this.http.post(`${baseUrl}userLogin`, loginData,{withCredentials: true});
  }

  logout(token: string): Observable<any>{
    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);

    return this.http.get(`${baseUrl}logout`, {headers});
  }

  verify(email: string, code: string): Observable<any>{
    const verifyData: FormData = new FormData();
    verifyData.append('email', email);
    verifyData.append('token', code);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      })
    };
    return this.http.post(`${baseUrl}verifyMail`, verifyData);
  }

  userDetail(token: string): Observable<any>{
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${baseUrl}userDetails`, {headers: headers});
  }

  findRole(token: string): Observable<any>{
    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };
    const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`);
    return this.http.get(`${baseUrl}me`, {headers});
  }

}
