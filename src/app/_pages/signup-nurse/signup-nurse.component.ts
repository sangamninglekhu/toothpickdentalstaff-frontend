import { Component, ElementRef, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { RegisterService } from "src/app/_services";
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { Staff } from "src/app/_models/staff";

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
  loading: boolean = false;
  staffs: Staff;
  staffs2: any[];
  isLoaded: boolean = false;
  afterSub: boolean = false;
  emailExists: boolean = false;

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
      staff_id: [(value && value.staff_id) || "", [Validators.required]],
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

  ngOnInit() {
    // this.staffs = this.registerService.getStaffs().subscribe;
    this.registerService.getStaffs().subscribe(
      data => {
        this.staffs = data.result;
        this.isLoaded= true;
        // this.signup.reset();
        // this.signup.patchValue({
        // });
        // this.staffs2 = this.stafff;
        console.log("success: ", this.staffs);
      },
      error => {
        console.log("error: ",error.message,error);
      });


  }



  // Function to run after form submission
  onSubmit() {
    console.log(this.signup.value);

    this.submitted = true;
    this.signup.value.role = 2;
    // stop here if form is invalid
    if (this.signup.invalid) {
      delete this.signup.value.confirmpassword;
      delete this.signup.value.staff_id;
      return;
    }
    delete this.signup.value.confirmpassword;
    delete this.signup.value.staff_id;

    console.log('check: ',this.signup.value);
    this.registerService
    .checkEmail(this.signup.value.email)
    .subscribe(
      (data) => {
        this.emailExists = false;
        console.log("success1: ", data);
        this.registerService.register(this.signup.value).subscribe(
          (data) => {
            console.log("success2: ", data);
            this.jobSuccess = true;
            this.router.navigate(["/verifyemail"]);

          },
          (error) => {
            this.jobSuccess = false;
            console.log("error2: ", error.message, error);
          }
        );

      },
      (error) => {
        this.emailExists = true;
        this.jobSuccess = false;
        console.log("error1: ", error.message, error);
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
      staff_id:""
    });
  }

}
