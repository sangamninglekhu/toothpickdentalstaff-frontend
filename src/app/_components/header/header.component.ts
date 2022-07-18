import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public authService: AuthService,
    public router: Router,
    private http: HttpClient
    ) { }

  ngOnInit() {
  }

  signOut(){
    this.authService.signOut();
    this.router.navigate(["/signin"]);

  }

}
