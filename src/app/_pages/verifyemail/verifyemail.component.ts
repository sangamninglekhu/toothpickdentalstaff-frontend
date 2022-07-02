import { Component, ElementRef, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
  jobSuccess: boolean = false;
  fileToUpload: File | null = null;
  vacancyId: string;
  submitted: boolean = false;
  fileEmpty: boolean = true;
  checkbox: boolean = false;

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
      username: [(value && value.username) || "", Validators.required],
      code: [(value && value.code) || "", Validators.required],
    });

    // Get the last state of the contact form
    this.defaultState = this.verify.value;

    // Pre-fill the form with previous data. Handy on accidental page refresh or reloads.
    this.verify.valueChanges.subscribe((value) => {
      localStorage.setItem(
        "TDS verifyform",
        JSON.stringify(this.verify.value)
      );
    });

  }

  ngOnInit() {}

  // Function to run after form submission
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.verify.invalid) {
      console.log("form failed");
      return;
    }
    console.log("form success");

    this.authService
      .login(this.verify.value.username, this.verify.value.code)
      .subscribe((data) => {
        // console.log(data);
        window.location.href = data.result.url;
        // this.router.navigate(["/home"]);
      },
      error => {
        console.log("error: ",error.message,error);
      });
  }

  // Getter for easy access to form fields
  get f() {
    return this.verify.controls;
  }
}
