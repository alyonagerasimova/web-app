import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtResponse, UserLogin, UserProfile, UserRegister} from "../modules/types";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TokenService} from "./token.service";

const AUTH_API = environment.apiUrl + "/auth/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(credentials: UserLogin): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(AUTH_API + "login", credentials, httpOptions);
  }

  register(info: UserRegister): Observable<unknown>{
    return this.http.post(AUTH_API + "register", info, {
      responseType: "text"
    });
  }

  logout(): void {
    this.tokenService.signOut();
    // return this.http.post<void>(AUTH_API + "logout", {});
  }
  constructor(private http: HttpClient, private readonly tokenService: TokenService) { }


}
