import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router

  ) { }

  ngOnInit() {
    this.authService.signOut().subscribe((data) => {
      console.log('loggin u out :',data);
      // this.router.navigate(["/signin"]);
    });
    // window.location.href='https://test.toothpickdentalstaff.com/signin';
  }
}
