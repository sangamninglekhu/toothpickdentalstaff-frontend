import { Component, ElementRef, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { RegisterService } from "src/app/_services";
import { MustMatch } from "src/app/_helpers/must-match.validator";
import { Staff } from "src/app/_models/staff";
import { FileValidator } from "src/app/_helpers/file.validator";

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
  dataLoading: boolean = false;
  staffs: Staff;
  staffs2: any[];
  isLoaded: boolean = false;
  afterSub: boolean = false;
  emailExists: boolean = false;
  imageURL: string;
  noStaff_id: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private registerService: RegisterService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    // Get the last values of the form
    const value = JSON.parse(localStorage.getItem("signUpNurseValue"));
    this.signup = this.fb.group(
      {
        // checkArray: this.fb.array([]),
        full_name: [
          (value && value.full_name) || "",
          [Validators.required, Validators.maxLength(50)],
        ],
        contact: [
          (value && value.contact) || "",
          [Validators.required, Validators.maxLength(25)],
        ],
        dob: [(value && value.dob) || "", Validators.required],
        email: [
          (value && value.email) || "",
          [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
            Validators.maxLength(100),
          ],
        ],
        staff_id: this.fb.array([]),
        picture: [
          null,
          [Validators.required, FileValidator.fileMaxSize(500000)],
        ],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmpassword: ["", Validators.required],
        role: [(value && value.role) || ""],
      },
      {
        validator: MustMatch("password", "confirmpassword"),
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

  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signup.patchValue({
      picture: file,
    });
    this.signup.get("picture").updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
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

  onCheckboxChange(e) {
    console.log("getting: ", this.signup.get("staff_id"));
    const staff_id: FormArray = this.signup.get("staff_id") as FormArray;

    if (e.target.checked) {
      staff_id.push(new FormControl(e.target.value));
      this.noStaff_id = false;
    } else {
      let i: number = 0;
      staff_id.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          staff_id.removeAt(i);
          console.log("length of staff id: ", staff_id.length);
          if (staff_id.length == 0) {
            this.noStaff_id = true;
          }

          return;
        }
        i++;
      });
    }
  }

  ngOnInit() {
    // this.staffs = this.registerService.getStaffs().subscribe;
    this.dataLoading = true;
    this.registerService.getStaffs().subscribe(
      (data) => {
        this.staffs = data.result;
        this.isLoaded = true;
        this.dataLoading = false;

      },
      (error) => {
        console.log("error: ", error.message, error);
        this.isLoaded = false;
      }
    );
  }

  // Function to run after form submission
  onSubmit() {
    this.loading = true;

    this.submitted = true;
    this.signup.value.role = 2;

    // stop here if form is invalid
    if (this.signup.invalid || this.noStaff_id) {
      console.log("invaliddd:  ", this.signup.invalid);
      delete this.signup.value.confirmpassword;
      // delete this.signup.value.staff_id;
      this.loading = false;
      return;
    }

    delete this.signup.value.confirmpassword;

    console.log("check: ", this.signup.value);
    this.registerService.checkEmail(this.signup.value.email).subscribe(
      (data) => {
        this.emailExists = false;
        console.log("success1: ", data);
        this.registerService.register(this.signup.value, this.signup.value.staff_id, this.fileToUpload).subscribe(
          (data) => {
            console.log("success2: ", data);
            this.jobSuccess = true;
            localStorage.setItem("emailverify", this.signup.value.email);
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
        this.loading = false;
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
      staff_id: "",
    });
  }
}
