import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService: AuthService
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    // next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized =  this.authService.user.roles.includes(route.data.role);

    if (!isAuthorized) {
      window.alert('You are not authorized');
    }

    return this.authService.user.roles.includes(route.data.role);
  }

}
