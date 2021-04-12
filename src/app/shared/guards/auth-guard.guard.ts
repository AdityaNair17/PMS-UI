import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private authSvc : AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('loggedInUser')) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      console.log(user);
      if(!this.authSvc.IsUserAuthenticated){
      this.authSvc.storeUserData();
      }
      if (user.passwordChangeRequired) {
        this.router.navigate(['/layout/change-password']);
        return false;
      } else if (user.personalDetailsRequired) {
        // this.router.navigate(['/'])
        //redirect to personal details screen
        return false;
      } else {
        return true;
      }

    } else {
      this.router.navigate(['/auth/sign-in']);
      return false;
    }


  }

}
