import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Playlist} from "../modules/types";
import {environment} from "../../environments/environment";

const PLAYLIST_API = environment.apiUrl + "/api/v1/songs/";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  public getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(PLAYLIST_API);
  }

  getPlaylist(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${PLAYLIST_API}/${id}`);
  }
}
