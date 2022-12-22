import {Injectable} from '@angular/core';
import {Artist, ArtistCreate} from "../modules/types";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const ARTIST_API = environment.apiUrl + "/api/v1/artists";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) {
  }

  public getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(ARTIST_API);
  }

  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${ARTIST_API}/${id}`);
  }

  createArtist(artist: ArtistCreate): Observable<Artist> {
    return this.http.post<Artist>(ARTIST_API, artist);
  }

  updateArtist(artist: ArtistCreate, id: string): Observable<Artist> {
    return this.http.put<Artist>(`${ARTIST_API}/${id}`, artist);
  }

  deleteArtist(id: string) {
    return this.http.delete(`${ARTIST_API}/${id}`);
  }
}
