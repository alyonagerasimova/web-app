import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../../environments/environment";

const HOME_API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private userUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getUserByName(username: string){
    const url = `${HOME_API}/users/user?username=${username}`;
    return this.http.get(url, {responseType: "json"});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(HOME_API + "admin", {responseType: 'text'});
  }
}
