import { Component, ElementRef, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { RegisterService } from "src/app/_services";
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { Staff } from "src/app/_models/staff";
import { FileValidator } from "src/app/_helpers/file.validator";

@Component({
  selector: 'app-signup-practice',
  templateUrl: './signup-practice.component.html',
  styleUrls: ['./signup-practice.component.css']
})
export class SignupPracticeComponent implements OnInit {
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
  emailExists: boolean = false;
  staffs: Staff;
  staffs2: any[];
  imageURL: string;

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
      picture: [
        null,
        [Validators.required, FileValidator.fileMaxSize(5000000)],
      ],
      // staff_id: ['', [Validators.required]],
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
  }

    // Handling files for CV form field
    handleFileInput(files: FileList) {
      this.fileEmpty = false;
      this.fileToUpload = files.item(0);
      this.signup.get("picture").setValue(this.fileToUpload);
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(this.fileToUpload);

    }


  // Function to run after form submission
  onSubmit() {
    this.loading = true;
    console.log(this.signup.valid);
    console.log(this.signup.value);

    this.submitted = true;
    this.signup.value.role = 1;
    // stop here if form is invalid
    if (this.signup.invalid) {
      delete this.signup.value.confirmpassword;
      console.log(this.signup.value);
      console.log(this.signup);
      console.log("form failed");
      this.loading = false;
      return;
    }

    this.registerService.checkEmail(this.signup.value.email).subscribe(
      (data) => {
        this.emailExists = false;
        console.log("success1: ", data);
        this.registerService.registerPractice(this.signup.value, this.fileToUpload).subscribe(
          (data) => {
            console.log("success2: ", data);
            this.jobSuccess = true;
            localStorage.setItem("emailverify", this.signup.value.email);
            this.router.navigate(["/verifyemail"]);
          },
          (error) => {
            this.jobSuccess = false;
            console.log("error2: ", error.message, error);
            this.loading = false;
          }
        );
      },
      (error) => {
        this.emailExists = true;
        this.jobSuccess = false;
        console.log("error1: ", error.message, error);
        this.loading = false;
      }
    );  }

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
