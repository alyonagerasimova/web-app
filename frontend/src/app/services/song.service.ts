import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Song, SongCreate} from "../modules/types";
import {environment} from "../../environments/environment";

const SONG_API = environment.apiUrl + "/api/v1/songs";

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

  createSong(song: SongCreate): Observable<Song> {
    return this.http.post<Song>(SONG_API, song);
  }

  updateSong(song: SongCreate, id: string): Observable<Song> {
    return this.http.put<Song>(`${SONG_API}/${id}`, song);
  }

  deleteSong(id: string): Observable<Song> {
    return this.http.delete<Song>(`${SONG_API}/${id}`)
      .pipe(
        catchError(err => {
          console.error(err);
          alert("Ошибка удаления песни");
          return throwError(err);
        })
      );
  }
}
