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
    return this.http.post(url, reqObj , {observe : 'response'});
  }

  public DeleteAppointment(url : string){
    return this.http.delete(url);
  }
}
