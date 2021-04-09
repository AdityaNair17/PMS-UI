import { IUser } from './models/user-model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationToken : string = "";
  private userRole : string = "";
  private isUserAuthenticated : boolean = false;
  private personalDetailsRequired : boolean = true;
  private changePasswordRequired : boolean = true;
  private user : IUser;

  constructor(private http : HttpClient) { }

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

  public get ChangePasswordRequired(){
    return this.changePasswordRequired;
  }

  public set ChangePasswordRequired(changePasswordRequired : boolean){
    this.changePasswordRequired = changePasswordRequired;
  }

  public get User(){
    return this.user;
  }

  public set User(user : IUser){
    this.user = user;
  }

  public Login(user : any) : Observable<any> {
    return this.http.post('http://localhost:300/login', user);
  }
}
