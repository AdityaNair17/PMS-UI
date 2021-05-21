import { AuthService } from './../auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(private authSvc : AuthService){}

  intercept(httpRequest : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{

    if(this.authSvc.IsUserAuthenticated){
    let token = this.authSvc.AuthenticationToken;
    let clonedHttpReq = httpRequest.clone({
      setHeaders : {
        Authorization : `Bearer ${token}`
      }
    });

    console.log(clonedHttpReq);
    return next.handle(clonedHttpReq);
  } else{
    return next.handle(httpRequest);
  }
  }
}