import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Song} from "../modules/types";
import {environment} from "../../environments/environment";

const SONG_API = environment.apiUrl + "/api/v1/songs/";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  public getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(SONG_API);
  }

  getSong(id: string): Observable<Song> {
    return this.http.get<Song>(`${SONG_API}/${id}`);
  }
}
