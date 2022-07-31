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
    // if (this.router.url !== "/logout") {
    //   this.authService.isLoggedIn.subscribe((data) => {
    //     if (data) {
    //       this.authService.me().subscribe(
    //         (data) => {
    //           if (data.role == 1) {
    //             window.location.href =
    //               "https://practice.toothpickdentalstaff.com/";
    //           } else {
    //             window.location.href = "https://dcp.toothpickdentalstaff.com/";
    //           }
    //         },
    //         (error) => {
    //           console.log("error1: ", error.message, error);
    //         }
    //       );
    //     } else {
    //       console.log("hey: ", data);
    //     }
    //   });
    // }
  }
  title = "toothpickdentalstaff-frontend";
}
