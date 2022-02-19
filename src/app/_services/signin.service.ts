import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any>{
    const loginData: FormData = new FormData();
    loginData.append('username', username);
    loginData.append('password', password);
    return this.http.get(`https://7b8bf3aa-34db-4c73-bb2b-a19b94e19f9f.mock.pstmn.io/login`);
  }

}
