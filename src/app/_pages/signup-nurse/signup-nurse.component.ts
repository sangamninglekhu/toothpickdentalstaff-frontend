import { Component, ElementRef, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { RegisterService } from "src/app/_services";
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: "app-signup-nurse",
  templateUrl: "./signup-nurse.component.html",
  styleUrls: ["./signup-nurse.component.css"],
})
export class SignupNurseComponent implements OnInit {
  // Initializing required variables
  signup: FormGroup;
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
    private registerService: RegisterService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {

    // Get the last values of the form
    const value = JSON.parse(localStorage.getItem("signUpNurseValue"));
    this.signup = this.fb.group({
      full_name: [
        (value && value.full_name) || "",
        [Validators.required, Validators.maxLength(50)],
      ],
      contact: [
        (value && value.contact) || "",
        [Validators.required, Validators.maxLength(25)],
      ],
      email: [
        (value && value.email) || "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          Validators.maxLength(100),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required],
      role: [(value && value.role) || ""],
    },
    {
      validator: MustMatch('password', 'confirmpassword')
    }
    );

    // Get the last state of the contact form
    this.defaultState = this.signup.value;

    // Pre-fill the form with previous data. Handy on accidental page refresh or reloads.
    this.signup.valueChanges.subscribe((value) => {
      localStorage.setItem(
        "signUpNurseValue",
        JSON.stringify(this.signup.value)
      );
    });
  }

  ngOnInit() {}

  // Function to run after form submission
  onSubmit() {
    console.log(this.signup.valid);
    console.log(this.signup.value);

    this.submitted = true;
    this.signup.value.role = 2;
    // stop here if form is invalid
    if (this.signup.invalid) {
      delete this.signup.value.confirmpassword;
      console.log(this.signup.value);
      console.log(this.signup);
      console.log("form failed");
      return;
    }

    this.registerService.register(this.signup.value).subscribe(
      (data) => {
        console.log("success: ", data);
        this.jobSuccess = true;
      },
      (error) => {
        this.jobSuccess = false;
        console.log("error: ", error.message, error);
      }
    );
  }

  // Getter for easy access to form fields
  get f() {
    return this.signup.controls;
  }

  // Reset form
  clear() {
    this.submitted = false;
    this.signup.reset({
    });
  }

}
