import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { UserModel } from "../_models/user.model";
import { SigninService } from "./signin.service";
import { baseUrl } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = "TDS_auth";
  private readonly USER_NAME = "TDS_role";
  private readonly USER_EMAIL = "TDS_user";
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
  constructor(
    private signinService: SigninService,
    public router: Router) {
    this._isLoggedIn.next(!!this.token);
    this.user = this.userDetail;
  }

  login(username: string, password: string) {
    return this.signinService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.result.token);
        localStorage.setItem(this.USER_EMAIL, username);
        this.userDetails(response.result.token).subscribe((data) => {
          this.user = data;
        });
      })
    );
  }

  me() {
    return this.signinService.findRole(localStorage.getItem(this.TOKEN_NAME)).pipe(
      tap((response: any) => {
        console.log('hello world: ',response.result);
        // this._isLoggedIn.next(true);
        // localStorage.setItem(this.TOKEN_NAME, response.result.token);
        // localStorage.setItem(this.USER_EMAIL, username);
        this.userDetails(response.result).subscribe((data) => {
          console.log('hello world: ',data, response.result);

          this.user = data;
        });
      })
    );
  }

  verify(username: string, code: string) {
    return this.signinService.verify(username, code).pipe(
      tap((response: any) => {
        console.log("I'm verifying ", response, this.user);
      })
    );
  }

  userDetails(token: string) {
    return this.signinService.userDetail(token).pipe(
      tap((response: any) => {
        // this._isLoggedIn.next(true);
        // localStorage.setItem(this.USER_NAME, response.role);
        this.user = response;
      })
    );
  }

  signOut() {
    const a = localStorage.getItem(this.TOKEN_NAME);
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.USER_NAME);
    console.log("signed out");
    console.log('this is my token :',a);

    this._isLoggedIn.next(false);
    // this.signinService.logout();
    return this.signinService.logout(a)
    .pipe(
      tap((response: any) => {
        console.log("I'm verifying ", a,response, this.user);
      })
    )
    ;
  }
}
