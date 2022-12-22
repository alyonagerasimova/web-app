import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { catchError, finalize, first, switchMap, tap, throwError } from "rxjs";
import { GenreService } from "../../../../services/genre.service";
import { PlaylistService } from "../../../../services/playlist.service";
import { SongService } from "../../../../services/song.service";
import { Genre, Playlist, Song } from "../../../types";

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  styleUrls: ['./playlist-songs.component.less']
})
export class PlaylistSongsComponent implements OnInit {
  public playlist?: null | Playlist;
  public isLoading = true;
  public songs?: Song[];
  private playlistId?: string | null;
  public defaultImg = "../../../../../assets/img/song_default.jpg";

  constructor(
    private readonly playlistService: PlaylistService,
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
          this.playlistId = params.get('id');
          return this.playlistService.getPlaylist(this.playlistId!);
        }),
        first(),
        tap(data => {
          this.playlist = data;
        }),
        catchError(err => {
          this.playlist = JSON.parse(err.error).message;
          return throwError(() => err);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  loadGenreSongs() {
    if (this.playlistId) {
      this.songService.getSongs()
        .pipe(
          tap(songs => {
            this.songs = songs.filter(song => song.genreId === this.playlist?.id);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }
}
