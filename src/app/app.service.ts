import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(private http : HttpClient) { }

  public previousUrl : string;
  public Get(url : string, param? : any){
    return this.http.get(url, {
      params : param
    });
  }

  public GetWithParam(url: string, param: any){
    return this.http.get(url, {
      params: param
    });
  }

  public Post(url : string, reqObj : any){
    return this.http.post(url, reqObj , {observe : 'response', responseType: 'text'});
  }

  public PostWithoutResponseCode(url : string, reqObj : any){
    return this.http.post(url, reqObj);
  }

  public DeleteAppointment(url : string){
    return this.http.put(url, {}, {observe : 'response', responseType: 'text'});
  }

  public Put(url : string, reqObj : any){
    return this.http.put(url, reqObj, {observe : 'response', responseType: 'text'});
  }

  public LoginCall(url:string, reqObj : any, headers : any){
    return this.http.post(url, reqObj, headers);
  }
  
  FormatDate(fullDate: Date) {
    let date: any = fullDate.getDate();
    date = date >= 10 ? date : `0${date}`;

    let month: any = fullDate.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;

    const year = fullDate.getFullYear();

    return `${year}-${month}-${date}`;

  }



}
