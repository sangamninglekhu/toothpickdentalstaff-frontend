import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { tap } from "rxjs/operators";
import { UserModel } from "../_models/user.model";
import { AuthService } from "../_services/auth.service";
import { SigninService } from "../_services/signin.service";

@Injectable({
  providedIn: "root",
})
export class HasRoleGuard implements CanActivate {
  private isAuthorized: boolean;
  private isLoaded = false;
  private myUser: UserModel;
  constructor(
    private authService: AuthService,
    private signinService: SigninService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    // next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

     return this.authService
      .userDetails(localStorage.getItem("TDS_auth"))
      .pipe(
        map(
          (data) => {
            const isAuthorized = data.role.includes(route.data.role);

            if (!isAuthorized) {
              // redirect
              // display a message
              window.alert("you are not authorized");
            }
            // data = data.role.includes(route.data.role);
            this.getUserDetails(data.role.includes(route.data.role));

            return isAuthorized || false;
          },

          (error) => {
            this.isLoaded = true;
            const isAuthorized = false;

            if (!isAuthorized) {
              // redirect
              // display a message
              window.alert("you are not authorized");
            }
            return isAuthorized || false;
          }
        )
      );

    // this.signinService.userDetail(localStorage.getItem("TDS_auth")).subscribe(
    //   (data) => {
    //     console.log("signin userrr: ", data.role);
    //     console.log("yahallo 2 : ", data);
    //     this.myUser = data;
    //     this.isLoaded = true;
    //     return data as UserModel;
    //   },
    //   (error) => {
    //     console.log("signin error: ", error.message, error);
    //     this.isLoaded = true;
    //   }
    // );
  }

  getUserDetails(x: boolean): boolean {

    return x;
    // this.signinService.userDetail(localStorage.getItem("TDS_auth")).subscribe(
    //   (data) => {
    //     console.log("signin userrr: ", data.role);
    //     console.log("yahallo 2 : ", data);
    //     this.myUser = data;
    //     this.isLoaded = true;
    //     return data as UserModel;
    //   },
    //   (error) => {
    //     console.log("signin error: ", error.message, error);
    //     this.isLoaded = true;
    //   }
    // );
  }
}
