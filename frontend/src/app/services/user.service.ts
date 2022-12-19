import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const HOME_API = environment.apiUrl + "/api/v1/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserByName(username: string) {
    const url = `${HOME_API}/users/user?username=${username}`;
    return this.http.get(url, {responseType: "json"});
  }

}
