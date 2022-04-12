import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { UserModel } from "../_models/user.model";
import { SigninService } from "./signin.service";
import { map, catchError } from "rxjs/operators";
import { baseUrl } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = "TDS_auth";
  private readonly USER_NAME = "TDS_role";
  isLoggedIn = this._isLoggedIn.asObservable();
  user!: UserModel;
  role!: number;

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }
  get userDetail(): any {
    return localStorage.getItem(this.USER_NAME);
  }

  // check jwt token expiration before doing this
  constructor(private signinService: SigninService, public router: Router) {
    this._isLoggedIn.next(!!this.token);
    this.user = this.userDetail;
  }

  login(username: string, password: string) {
    console.log("form-data ", username, password);
    return this.signinService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.result.token);
        this.userDetails(response.result.token).subscribe((data) => {
          this.user = data;
        });
      })
    );
  }

  userDetails(token: string) {
    return this.signinService.userDetail(token).pipe(
      tap((response: any) => {
        // this._isLoggedIn.next(true);
        // localStorage.setItem(this.USER_NAME, response.role);
        this.user = response;
        console.log("jwt ",response, this.user);
      })
    );
  }

  signOut() {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.USER_NAME);
    console.log("signed out");
    this._isLoggedIn.next(false);

  }
}
