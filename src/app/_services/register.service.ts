import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "src/environments/environment";
import { Staff } from "../_models/staff";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(signupform, si, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append("full_name", signupform["full_name"]);
    formData.append("contact", signupform["contact"]);
    formData.append("dob", signupform["dob"]);
    formData.append("email", signupform["email"]);
    formData.append("picture", fileToUpload, fileToUpload.name);
    formData.append("password", signupform["password"]);
    formData.append("role", signupform["role"]);

    // Append staff_id as array since FormData.append does not work for array
    // Here '[]' is used at the end of formData key staff_id becuase php parses '[]' as array.
    // In case '[]' is not used, formData keeps overwriting the staff_id key value on each loop making the final value its only value.
    for (var v of si) {
      formData.append("staff_id[]", v);;
    }

    return this.http.post(`${baseUrl}registerUser`, formData);
  }
  registerPractice(signupform, fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append("full_name", signupform["full_name"]);
    formData.append("contact", signupform["contact"]);
    formData.append("email", signupform["email"]);
    formData.append("picture", fileToUpload, fileToUpload.name);
    formData.append("password", signupform["password"]);

    return this.http.post(`${baseUrl}registerUser`, formData);
  }

  getStaffs(): Observable<any> {
    return this.http.get<any>(`${baseUrl}register`);
  }

  checkEmail(email: string) {
    const _email: FormData = new FormData();
    _email.append("email", email);
    return this.http.post(`${baseUrl}checkMail`, _email);
  }

  sendVerificationCode(email: string) {
    const _email: FormData = new FormData();
    _email.append("email", email);
    return this.http.post(`${baseUrl}sendVerifyEmail`, _email);
  }


}
