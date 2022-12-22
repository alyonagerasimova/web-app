import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, finalize, first, switchMap, tap, throwError} from "rxjs";
import {GenreService} from "../../../../services/genre.service";
import {SongService} from "../../../../services/song.service";
import {Genre, Song} from "../../../types";

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
    this.loadGenreSongs();
  }

  loadGenre() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.genreId = params.get('id');
          return this.genreService.getGenre(this.genreId || "");
        }),
        first(),
        tap(data => {
          this.genre = data;
        }),
        catchError(err => {
          this.genre = JSON.parse(err.error).message;
          return throwError(() => err);
        }),
      )
      .subscribe();
  }

  loadGenreSongs() {
    if (this.genreId) {
      this.songService.getSongs()
        .pipe(
          tap((songs: Song[]) => {
            this.songs = songs.filter(song => song.genreId === this.genreId);
          }),
          finalize(() => {
            this.isLoading = false;
            console.log(this.songs)
          })
        )
        .subscribe();
    }
  }

}
