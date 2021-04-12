import { IUser, IUserSessionData } from './models/user-model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPatientRegistrationReq, IPatientRegistrationRes } from './models/patientRegistration-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationToken : string = "";
  private userRole : string = "";
  private isUserAuthenticated : boolean = false;
  private personalDetailsRequired : boolean = true;
  private passwordChangeRequired : boolean = true;
  private user : IUser;

  constructor(private http : HttpClient) {
   }

  public get AuthenticationToken(){
    return this.authenticationToken;
  }

  public set AuthenticationToken(authenticationToken : string){
    this.authenticationToken = authenticationToken;
  }

  public get UserRole() {
    return this.userRole;
  }

  public set UserRole(userRole : string) {
    this.userRole = userRole;
  }

  public get IsUserAuthenticated(){
    return this.isUserAuthenticated;
  }

  public set IsUserAuthenticated(isUserAuthenticated : boolean){
    this.isUserAuthenticated = isUserAuthenticated;
  }

  public get PersonalDetailsRequired(){
    return this.personalDetailsRequired;
  }

  public set PersonalDetailsRequired(personalDetailsRequired : boolean){
    this.personalDetailsRequired = personalDetailsRequired;
  }

  public get PasswordChangeRequired(){
    return this.passwordChangeRequired;
  }

  public set PasswordChangeRequired(passwordChangeRequired : boolean){
    this.passwordChangeRequired = passwordChangeRequired;
  }

  public get User(){
    return this.user;
  }

  public set User(user : IUser){
    this.user = user;
  }

  public Login(user : any) : Observable<any> {
    return this.http.post('http://localhost:8000/auth/login', user);
  }

  patientRegistration(patientDetails: IPatientRegistrationReq): Observable<IPatientRegistrationRes> {
    return of({ status: 200, message: 'Registered Successfully' })
  }

  public StoreSession(){
    const userData : IUserSessionData = {
      jwtToken : this.AuthenticationToken,
      userRole : this.UserRole,
      userInfo : this.User,
      personalDetailsRequired : this.PersonalDetailsRequired,
      passwordChangeRequired : this.passwordChangeRequired
    }
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  }

  public storeUserData(){
    const user : IUserSessionData = JSON.parse(localStorage.getItem('loggedInUser'));
    this.AuthenticationToken = user.jwtToken;
    this.UserRole = user.userRole;
    this.User = user.userInfo;
    this.PersonalDetailsRequired = user.personalDetailsRequired;
    this.PasswordChangeRequired = user.passwordChangeRequired;
    this.IsUserAuthenticated = true;
  }

  public LogOut(){
    localStorage.removeItem('loggedInUser');
    this.isUserAuthenticated = false;
  }
}
