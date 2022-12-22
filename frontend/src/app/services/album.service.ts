import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Album} from "../modules/types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const ALBUM_API = environment.apiUrl + "/api/v1/albums";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) {
  }

  public getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(ALBUM_API);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${ALBUM_API}/${id}`);
  }
}
