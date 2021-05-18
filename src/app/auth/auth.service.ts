import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser, IUserSessionData } from './models/user-model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IPatientRegistrationReq, IPatientRegistrationRes } from './models/patientRegistration-model';
import { IChangePasswordReq, IChangePasswordRes } from '../layout/models/changePassword-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationToken: string = "";
  private userRole: string = "";
  private isUserAuthenticated: boolean = false;
  private personalDetailsRequired: boolean = true;
  private passwordChangeRequired: boolean = true;
  private user: IUser;
  userObj = {
    "status": 200,
    "token": "sdfasdfasdfasdfasjkjskfjsfkhhfaskfjashfafklf",
    "user": {
    "firstName" : "Onkar",
    "lastName" : "Patil",
    "emailId" : "patil",
    "dateOfBirth" : "23/12/1997",
    "role" : "Doctor",
    "id" : "D123",
    "personalDetailsRequired": true,
    "passwordChangeRequired" : true
    }
  }

  constructor(private http : HttpClient,
              private modal : NgbModal) {
   }

  public get AuthenticationToken() {
    return this.authenticationToken;
  }

  public set AuthenticationToken(authenticationToken: string) {
    this.authenticationToken = authenticationToken;
  }

  public get UserRole() {
    return this.userRole;
  }

  public set UserRole(userRole: string) {
    this.userRole = userRole;
  }

  public get IsUserAuthenticated() {
    return this.isUserAuthenticated;
  }

  public set IsUserAuthenticated(isUserAuthenticated: boolean) {
    this.isUserAuthenticated = isUserAuthenticated;
  }

  public get PersonalDetailsRequired() {
    return this.personalDetailsRequired;
  }

  public set PersonalDetailsRequired(personalDetailsRequired: boolean) {
    this.personalDetailsRequired = personalDetailsRequired;
  }

  public get PasswordChangeRequired() {
    return this.passwordChangeRequired;
  }

  public set PasswordChangeRequired(passwordChangeRequired: boolean) {
    this.passwordChangeRequired = passwordChangeRequired;
  }

  public get User() {
    return this.user;
  }

  public set User(user: IUser) {
    this.user = user;
  }

  public Login(user: any): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        grant_type : 'password',
        username : user.email,
        password : user.password,
        client_id : 'kidclient',
        client_secret : 'kidsecret'
      }
    });

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    // return this.http.post('http://localhost:8000/auth/login', user);
    return of(this.userObj);

  }

  patientRegistration(patientDetails: IPatientRegistrationReq): Observable<IPatientRegistrationRes> {
    return of({ status: 200, message: 'Registered Successfully' })
  }

  changePassword(changePasswordDetails: IChangePasswordReq): Observable<IChangePasswordRes> {
    console.log(changePasswordDetails)
    return of({ status: 200, message: 'password changed Successfully' })
  }
  
  public StoreSession() {
    const userData: IUserSessionData = {
      jwtToken: this.AuthenticationToken,
      userRole: this.UserRole,
      userInfo: this.User,
      personalDetailsRequired: this.PersonalDetailsRequired,
      passwordChangeRequired: this.passwordChangeRequired
    }
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  }

  public storeUserData() {
    const user: IUserSessionData = JSON.parse(localStorage.getItem('loggedInUser'));
    this.AuthenticationToken = user.jwtToken;
    this.UserRole = user.userRole;
    this.User = user.userInfo;
    this.PersonalDetailsRequired = user.personalDetailsRequired;
    this.PasswordChangeRequired = user.passwordChangeRequired;
    this.IsUserAuthenticated = true;
  }

  public LogOut() {
    localStorage.removeItem('loggedInUser');
    this.isUserAuthenticated = false;
  }

  public openModal(component : any){
    this.modal.open(component, {backdrop: 'static'});
  }
}
