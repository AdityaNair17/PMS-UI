import { ApiConstants } from './../api.constants';
import { AppService } from './../app.service';
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
    "access_token": "sdfasdfasdfasdfasjkjskfjsfkhhfaskfjashfafklf",
    "firstName" : "Onkar",
    "lastName" : "Patil",
    "emailId" : "patil",
    "dateOfBirth" : "23/12/1997",
    "user_role" : "Doctor",
    "fullName" : "Onkar Patil",
    "userId" : "11",
    "personalDetailsRequired": true,
    "passwordChangeRequired" : true
  }

  constructor(private http : HttpClient,
              private modal : NgbModal,
              private appSvc : AppService) {
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
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'login');
    return this.appSvc.LoginCall(url, params, httpOptions);

  }

  patientRegistration(patientDetails): Observable<any> {
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'userRegistration');
    return this.appSvc.Post(url, patientDetails);
  }

  changePassword(changePasswordDetails: IChangePasswordReq): Observable<any> {
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'changePassword');
    return this.appSvc.Put(url, changePasswordDetails);
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

  public forgotPassword(email : string){
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'forgotPassword', email);
    return this.appSvc.Post(url, {});
  }

  upatedPatientDetailsRequirement(isPasswordChangeRequired : boolean, isPersonalDetailsRequired : boolean, userId : string){
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'updatePatientDetailCall', isPasswordChangeRequired, isPersonalDetailsRequired, userId);
    return this.appSvc.Put(url, {});
  }

  getUserById(id : string) : Observable<any>{
    const url = ApiConstants.generateDynamicEndpoint('authenticationEndpoint', 'getUserById', id);
    return this.appSvc.Get(url);
  }
}
