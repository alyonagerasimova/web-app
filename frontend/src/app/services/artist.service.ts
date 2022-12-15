import { Injectable } from '@angular/core';
import {Artist} from "../modules/types";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const ARTIST_API = environment.apiUrl + "/artists/";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  public getArtists(): Observable<Artist[]>{
    return this.http.get<Artist[]>(ARTIST_API);
  }

  getArtist(id : string): Observable<Artist>{
    return this.http.get<Artist>(`${ARTIST_API}/${id}`);
  }

  //   @PostMapping("/create")
  //   @PreAuthorize("hasRole('ADMIN')")
  //   public ArtistDto create(@RequestBody ArtistDto dto) {
  //   if (dto.getId() != null) {
  //   dto.setId(null);
  // }
  // return artistService.save(dto);
  // }
  //
  // @PutMapping("/{id}")
  // @PreAuthorize("hasRole('ADMIN')")
  // public ArtistDto update(@PathVariable String id,@RequestBody ArtistDto dto) {
  //   dto.setId(id);
  //   return artistService.save(dto);
  // }
  //
  // @DeleteMapping("/{id}")
  // @PreAuthorize("hasRole('ADMIN')")
  // public void delete(@PathVariable String id) {
  //   artistService.delete(id);
  // }

}
