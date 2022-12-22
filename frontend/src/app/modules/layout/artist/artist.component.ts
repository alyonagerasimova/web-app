import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Album, Artist, Song} from "../../types";
import {ArtistService} from "../../../services/artist.service";
import {catchError, finalize, first, switchMap, tap, throwError} from "rxjs";
import {SongService} from "../../../services/song.service";

@Component({
  selector: "app-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.less"]
})
export class ArtistComponent implements OnInit {

  public artist?: null | Artist;
  public isLoading = true;
  public songs?: Song[];
  public albums?: Album[];
  private artistId?: string | null;
  defaultArtistPhoto = "../../../../assets/img/avatar.svg";
  defaultImg = "../../../../assets/img/song_default.jpg";

  constructor(private readonly artistService: ArtistService,
              private readonly route: ActivatedRoute,
              private readonly songService: SongService) {
  }

  ngOnInit(): void {
    this.loadArtist();
    this.loadArtistSong()
  }

  loadArtist() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.artistId = params.get('id');
          return this.artistService.getArtist(this.artistId || "");
        }),
        first(),
        tap(data => {
          this.artist = data;
        }),
        catchError(err => {
          this.artist = JSON.parse(err.error).message;
          return throwError(() => err);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  loadArtistSong() {
    if (this.artistId) {
      this.songService.getSongs()
        .pipe(
          tap(songs => {
            this.songs = songs.filter(song => song.artistId === this.artist?.id);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }
}
