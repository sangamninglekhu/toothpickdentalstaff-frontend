import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./_services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) // private signinService: SigninService
  {}

  ngOnInit() {
    console.log('the url is: ',window.location.href, this.authService.isLoggedIn);

    this.authService.isLoggedIn.subscribe((data) => {
      console.log('the value of loggedin is: ',data);
    });


    if (window.location.href != "http://test.toothpickdentalstaff.com/logout") {
      console.log('the url is again: ',window.location.href);

      this.authService.isLoggedIn.subscribe((data) => {
        if (data) {
          this.authService.me().subscribe(
            (data) => {
              if (data.role == 1) {
                // window.location.href =
                //   "https://practice.toothpickdentalstaff.com/";
              } else {
                // window.location.href = "https://dcp.toothpickdentalstaff.com/";
              }
            },
            (error) => {
              console.log("error1: ", error.message, error);
            }
          );
        } else {
          console.log("hey: ", data);
        }
      });
    }
  }
  title = "toothpickdentalstaff-frontend";
}
