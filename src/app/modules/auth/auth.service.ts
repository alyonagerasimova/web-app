import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtResponse, UserLogin, UserRegister} from "../types";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const AUTH_API = environment.apiurl + "/auth/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(credentials: UserLogin): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(AUTH_API + "login", credentials, httpOptions);
  }

  register(info: UserRegister): Observable<string>{
    return this.http.post<string>(AUTH_API + "register", info, httpOptions);
  }

  constructor(private http: HttpClient) { }


}
