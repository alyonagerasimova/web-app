import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtResponse, UserLogin, UserProfile, UserRegister} from "../modules/types";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {TokenService} from "./token.service";

const AUTH_API = environment.apiUrl + "/auth/";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient, private readonly tokenService: TokenService) {}

  login(credentials: UserLogin): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(AUTH_API + "login", credentials, httpOptions)
      .pipe(
        tap(data => {
          this.tokenService.saveToken(data.jwt);
          this.tokenService.saveUser(data);
        })
      );
  }

  register(info: UserRegister): Observable<unknown> {
    return this.http.post(AUTH_API + "register", info, {
      responseType: "text"
    })
      .pipe(
        tap(data => {
          this.tokenService.signOut();
        })
      );
  }
}
