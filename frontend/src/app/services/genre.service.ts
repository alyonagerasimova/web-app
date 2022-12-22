import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Genre} from "../modules/types";

const GENRE_API = environment.apiUrl + "/api/v1/genres";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) {
  }

  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(GENRE_API);
  }

  getGenre(id: string): Observable<Genre> {
    return this.http.get<Genre>(`${GENRE_API}/${id}`);
  }
}
