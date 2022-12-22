import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Artist, ArtistCreate, Playlist, PlaylistCreate } from "../modules/types";
import {environment} from "../../environments/environment";

const PLAYLIST_API = environment.apiUrl + "/api/v1/playlists";

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

  public createPlaylist(playlist: PlaylistCreate): Observable<Playlist> {
    return this.http.post<Playlist>(PLAYLIST_API, playlist);
  }

  updatePlaylist(playlist: PlaylistCreate, id: string): Observable<PlaylistCreate> {
    return this.http.put<PlaylistCreate>(`${PLAYLIST_API}/${id}`, playlist);
  }

  deletePlaylist(id: string): Observable<PlaylistCreate> {
    return this.http.delete<PlaylistCreate>(`${PLAYLIST_API}/${id}`)
      .pipe(
        catchError(err => {
          console.error(err);
          alert("Ошибка удаления плейлиста");
          return throwError(err);
        })
      );
  }
}
