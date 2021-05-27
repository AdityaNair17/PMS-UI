import { AuthService } from './../auth/auth.service';
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
      if(!this.authSvc.IsUserAuthenticated){
      this.authSvc.storeUserData();
      }
      if (this.authSvc.PasswordChangeRequired) {
        this.router.navigate(['/layout/change-password']);
        return false;
      } else if (this.authSvc.PersonalDetailsRequired) {
        this.router.navigate(['/layout/patient/add-patient-details']);
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
