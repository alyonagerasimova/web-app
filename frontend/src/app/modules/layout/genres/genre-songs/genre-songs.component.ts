import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { catchError, finalize, first, switchMap, tap, throwError } from "rxjs";
import { ArtistService } from "../../../../services/artist.service";
import { GenreService } from "../../../../services/genre.service";
import { SongService } from "../../../../services/song.service";
import { Album, Artist, Genre, Song } from "../../../types";

@Component({
  selector: 'app-genre-songs',
  templateUrl: './genre-songs.component.html',
  styleUrls: ['./genre-songs.component.less']
})
export class GenreSongsComponent implements OnInit {

  public genre?: null | Genre;
  public isLoading = true;
  public songs?: Song[];
  private genreId?: string | null;
  public defaultImg = "../../../../../assets/img/song_default.jpg";

  constructor(private readonly genreService: GenreService,
    private readonly route: ActivatedRoute,
    private readonly songService: SongService) {
  }

  ngOnInit(): void {
    this.loadGenre();
    this.loadGenreSongs()
  }

  loadGenre() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.genreId = params.get('id');
          return this.genreService.getGenre(this.genreId!);
        }),
        first(),
        tap(data => {
          this.genre = data;
        }),
        catchError(err => {
          this.genre = JSON.parse(err.error).message;
          return throwError(() => err);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  loadGenreSongs() {
    if (this.genreId) {
      this.songService.getSongs()
        .pipe(
          tap(songs => {
            this.songs = songs.filter(song => song.genreId === this.genre?.id);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }

}
