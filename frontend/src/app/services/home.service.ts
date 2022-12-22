import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Artist, Playlist, Song} from "../modules/types";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const HOME_API = environment.apiUrl + "/api/v1/home";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // private url = "http://localhost:8080/home";

  public getData(): Observable<[Song[], Playlist[], Artist[]]> {
    return this.http.get<[Song[], Playlist[], Artist[]]>(HOME_API, httpOptions);
  }

  constructor(private http: HttpClient) {
  }
}
