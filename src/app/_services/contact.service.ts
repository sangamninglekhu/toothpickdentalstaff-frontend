import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    // public oktaAuth: OktaAuthService,
    private http: HttpClient) {
    }

    // Send message
    sendMessage(contact_message) {
      return this.http.post(`${baseUrl}message`, contact_message);
    }
}
