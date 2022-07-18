import { Component, ElementRef, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserModel } from "src/app/_models/user.model";
import { AuthService } from "src/app/_services/auth.service";
import { SigninService } from "src/app/_services/signin.service";

@Component({
  selector: "app-verifyemail",
  templateUrl: "./verifyemail.component.html",
  styleUrls: ["./verifyemail.component.css"],
})
export class VerifyemailComponent implements OnInit {
  // Initializing required variables
  verify: FormGroup;
  defaultState;
  success: boolean = false;
  verifyFailed: boolean = false;
  errorMsg: string;
  fileToUpload: File | null = null;
  vacancyId: string;
  submitted: boolean = false;
  fileEmpty: boolean = true;
  checkbox: boolean = false;
  loading: boolean=false;
  verifyEmail: string;
  testsubs: Subscription;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private signinService: SigninService
  ) {
    // Get the last values of the form
    const value = JSON.parse(localStorage.getItem("jobFormValue"));
    this.verify = this.fb.group({
      // username: [(value && value.username) || "", Validators.required],
      code: [(value && value.code) || "", Validators.required]
    });

    // Get the last state of the contact form
    this.defaultState = this.verify.value;

    // Pre-fill the form with previous data. Handy on accidental page refresh or reloads.
    this.verify.valueChanges.subscribe((value) => {
      localStorage.setItem("TDS verifyform", JSON.stringify(this.verify.value));
    });
  }

  ngOnInit() {
    this.testsubs = this.activatedRoute.queryParams.subscribe(params => {
      this.verifyEmail = params["email"];
    });

  }

  // Function to run after form submission
  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.verify.invalid) {
      console.log("form failed");
      this.loading = false;

      return;
    }
    console.log("form success");

    this.authService
      .verify(localStorage.getItem('emailverify'), this.verify.value.code)
      .subscribe(
        (data) => {
          this.success = true;
          this.verifyFailed = false;
          console.log('successful verification');
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "success": true
            }
          };
          this.router.navigate(["/signin"], navigationExtras);

          // window.location.href = data.result.url;
          // this.router.navigate(["/home"]);
        },
        (error) => {
          console.log("error: ", error.message, error);
          this.errorMsg = error.error.message;
          this.success = false;
          this.verifyFailed = true;
          this.loading = false;
        }
      );
  }

  // Getter for easy access to form fields
  get f() {
    return this.verify.controls;
  }
}
