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

//   @PostMapping
//   @PreAuthorize("hasRole('ADMIN')")
//   public ResponseEntity<?> create(@RequestBody AlbumCreateDto dto) {
//   try {
//   if (dto.getId() != null) {
//   dto.setId(null);
// }
// return ResponseEntity.ok(this.albumService.save(dto));
// } catch (Exception ex) {
//   ex.printStackTrace();
//   return ResponseEntity.badRequest().body(ex.getMessage());
// }
// }
//
// @PutMapping("/{id}")
// @PreAuthorize("hasRole('ADMIN')")
// public AlbumDto update(@PathVariable String id, @RequestBody AlbumCreateDto dto) {
//   dto.setId(id);
//   return albumService.save(dto);
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
