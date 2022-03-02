import { Component, ElementRef, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { CareerService } from "src/app/_services/career.service";

@Component({
  selector: "app-careerform",
  templateUrl: "./careerform.component.html",
  styleUrls: ["./careerform.component.css"],
})
export class CareerformComponent implements OnInit {
  // Initializing required variables
  careerForm: FormGroup;
  defaultState;
  jobSuccess: boolean = false;
  fileToUpload: File | null = null;
  vacancyId: string;
  submitted: boolean = false;
  fileEmpty: boolean = true;
  checkbox: boolean = false;

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private careerService: CareerService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    // Get the last values of the form
    const value = JSON.parse(localStorage.getItem("jobFormValue"));
    this.careerForm = this.fb.group({
      // full_name: [value && value.full_name || '', Validators.required],
      // phone: [value && value.no_of_days || '', Validators.required],
      // email: [value && value.email || '', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.maxLength(100)]],
      // drive: [value && value.drive || '', Validators.required],
      // access_to_car: [value && value.access_to_car || '', Validators.required],
      // postcode: [value && value.postcode || '', [Validators.required, Validators.pattern("([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})")]],
      // cv: [value && value.cv || '', Validators.required]
    });

    // Get the last state of the contact form
    this.defaultState = this.careerForm.value;

    // Pre-fill the form with previous data. Handy on accidental page refresh or reloads.
    this.careerForm.valueChanges.subscribe((value) => {
      localStorage.setItem(
        "TDS_careerform",
        JSON.stringify(this.careerForm.value)
      );
    });
  }

  ngOnInit() {}

  // Function to run after form submission
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.careerForm.invalid) {
      console.log("form failed");
      return;
    }
    console.log("form success");

    this.careerService
      .apply(this.careerForm.value)
      .subscribe((data) => {
        this.router.navigate(["/about"]);
      });
  }

  // Getter for easy access to form fields
  get f() {
    return this.careerForm.controls;
  }
}
