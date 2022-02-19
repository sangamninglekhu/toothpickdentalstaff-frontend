import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { UserModel } from "../_models/user.model";
import { SigninService } from "./signin.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'TDS_auth';
  isLoggedIn = this._isLoggedIn.asObservable();
  user!: UserModel;

  get token(): any{
    return localStorage.getItem(this.TOKEN_NAME);
  }

  // check jwt token expiration before doing this
  constructor(private signinService: SigninService) {
    this._isLoggedIn.next(!!this.token);
    this.user = this.getUser(this.token);

  }

  login(username: string, password: string) {
    return this.signinService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        this.user = this.getUser(response.token);
        console.log(response.token);
      })
    );
  }

  private getUser(token: string): UserModel {
    if (!token) {
      return null
    }
    return JSON.parse(atob(this.token.split('.')[1])) as UserModel;
  }
}
