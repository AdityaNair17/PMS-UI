import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(private http : HttpClient) { }


  public Get(url : string){
    return this.http.get(url);
  }

}
