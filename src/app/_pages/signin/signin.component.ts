import { Component, ElementRef, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserModel } from "src/app/_models/user.model";
import { AuthService } from "src/app/_services/auth.service";
import { SigninService } from "src/app/_services/signin.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  // Initializing required variables
  loginForm: FormGroup;
  defaultState;
  signinFail: boolean = false;
  fileToUpload: File | null = null;
  vacancyId: string;
  errorMsg: string;
  submitted: boolean = false;
  fileEmpty: boolean = true;
  checkbox: boolean = false;
  loading: boolean = false;
  testsubs: Subscription;
  isVerified: boolean = false;
  showVerified: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private signinService: SigninService
  ) {
    // Get the last values of the form
    const value = JSON.parse(localStorage.getItem("jobFormValue"));
    this.loginForm = this.fb.group({
      username: [(value && value.username) || "", Validators.required],
      password: [(value && value.password) || "", Validators.required],
      remember_token: [(value && value.remember_token) || ""],
    });

    // Get the last state of the contact form
    this.defaultState = this.loginForm.value;
    // Pre-fill the form with previous data. Handy on accidental page refresh or reloads.
    this.loginForm.valueChanges.subscribe((value) => {
      localStorage.setItem(
        "TDS loginform",
        JSON.stringify(this.loginForm.value)
      );
    });

    // this.signinService.userDetail(localStorage.getItem("TDS_auth")).subscribe(
    //   (data: UserModel) => {
    //     console.log("signin user: ", data.role);
    //     return data;
    //   },
    //   error => {
    //     console.log("signin error: ",error.message,error);
    //     return error;
    //   });
  }

  ngOnInit() {
    this.testsubs = this.activatedRoute.queryParams.subscribe((params) => {
      this.isVerified = params["success"];
      console.log("is verified: ", this.isVerified);
    });
    this.showVerified = this.isVerified ? true : false;

    console.log("checking: ", this.authService.isLoggedIn);
    // if (!this.authService.isLoggedIn){
    //   this.router.navigate(["/home"]);
    // }

    this.authService.isLoggedIn.subscribe((data) => {
      if (data) {
        this.router.navigate(["/home"]);
      }
    });
  }

  // Function to run after form submission
  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    console.log("form success");

    // remembere me if checked
    if (this.loginForm.value.remember_token){
      this.loginForm.value.remember_token = 1;
    } else {
      delete this.loginForm.value.remember_token;
    }

    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (data) => {
          // console.log(data);
          window.location.href = data.result.url;
          // this.router.navigate(["/home"]);
        },
        (error) => {
          console.log("error: ", error.error.message);
          this.signinFail = true;
          this.errorMsg = error.error.message;
          this.loading = false;
        }
      );
  }

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
}
