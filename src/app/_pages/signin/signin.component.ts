import { Component, ElementRef, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {

  // Initializing required variables
  loginForm: FormGroup;
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
    public router: Router
  ) {

    // Get the last values of the form
    const value = JSON.parse(localStorage.getItem("jobFormValue"));
    this.loginForm = this.fb.group({
      username: [(value && value.username) || "", Validators.required],
      password: [(value && value.password) || "", Validators.required],
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
  }

  ngOnInit() {}

  // Function to run after form submission
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("form failed");
      return;
    }
    console.log("form success");

    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((data) => {
        this.router.navigate(["/about"]);
      });
  }

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
}
