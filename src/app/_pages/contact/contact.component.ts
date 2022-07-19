import { Component, OnInit, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ContactService } from "src/app/_services/contact.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  // Initializing required variables
  contactForm: FormGroup;
  checked: boolean = false;
  contactSuccess: boolean = false;
  loading: boolean = false;
  submitted = false;
  error: string;
  defaultState;

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private contactService: ContactService
  ) {
    // Get the last values of the form
    const value = JSON.parse(localStorage.getItem("contactFormValue"));

    // Form group for contact form
    this.contactForm = this.fb.group({
      full_name: [(value && value.full_name) || "", Validators.required],
      email: [
        (value && value.email) || "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          Validators.maxLength(100),
        ],
      ],
      phone: [(value && value.phone) || ""],
      subject: [(value && value.subject) || "", Validators.required],
      contact_message: [
        (value && value.contact_message) || "",
        Validators.required,
      ],
    });

    // Get the last state of the contact form
    this.defaultState = this.contactForm.value;

    // Pre-fill the form with previous data. Handy on accidental page refresh or reloads.
    this.contactForm.valueChanges.subscribe((value) => {
      localStorage.setItem(
        "contactFormValue",
        JSON.stringify(this.contactForm.value)
      );
    });
  }

  ngOnInit() {
    // var s = document.createElement("script");
    // s.src = "../../assets/js/aivons.js";
    // this.elementRef.nativeElement.appendChild(s);
  }

  // Function to run after form submission
  onSubmit() {
    // console.log((<FormArray>this.bookForm.get('staffs')).controls[0]);
    // return;

    // Change form status
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      console.log("Invalid form");
      return;
    }

    // Calling function to send message to the API
    this.contactService.sendMessage(this.contactForm.value).subscribe(
      (data) => {
        this.contactSuccess = true;
        this.loading = false;
      },
      (error) => {
        this.contactSuccess = false;
        this.loading = false;
        this.error = error.error.message;
        console.log("error: ", error.message, error);
      }
    );
  }

  // Getter for easy access to form fields
  get c() {
    return this.contactForm.controls;
  }

  // Reset form
  clear() {
    this.submitted = false;
    this.contactForm.reset({
    });
  }
}
