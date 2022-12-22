import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongService} from "../../../../services/song.service";
import {ArtistService} from "../../../../services/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Artist, Genre, Song, SongCreate } from "../../../types";
import {finalize, first, switchMap, tap} from "rxjs";
import {MyRoutes} from "../../../my-routes";
import {GenreService} from "../../../../services/genre.service";

@Component({
  selector: 'app-create-song',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.less']
})
export class SongFormComponent implements OnInit {

  isLoading = true;
  songId: string | null | undefined;
  artistsList: Artist[] = [];
  genresList: Genre[] = [];
  song: SongCreate | undefined;

  formGroup: FormGroup = this.formBuilder.group({
    songName: ["", [Validators.required, Validators.minLength(2)]],
    source: ["", [Validators.required]],
    cover: [""],
    artistId: [""],
    genreId: [""]
  });

  constructor(private songService: SongService,
              private artistService: ArtistService,
              private formBuilder: FormBuilder,
              private genreService: GenreService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          this.songId = paramMap.get("id");
          return this.songService.getSong(this.songId || "");
        }),
        first(),
        tap(song => {
          this.song = song;
          this.pathForm(song);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();

    this.loadArtists();
    this.loadGenres();
  }

  private pathForm(song: Song) {
    this.formGroup.patchValue({
      songName: song.songName,
      source: song.source,
      cover: song.cover,
      artistId: song.artistId,
    });
    this.formGroup.markAsPristine();
  }

  invalidateForm() {
    this.formGroup.markAsDirty();
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  onSubmit() {
    const modelValue = this.formGroup.value;
    const model: SongCreate = {
      songName: modelValue.songName!,
      cover: modelValue.cover!,
      source: modelValue.source,
      artistId: modelValue.artistId,
      genreId: modelValue.genreId
    };

    if(this.songId){
      this.songService
        .updateSong(model, this.songId)
        .pipe(
          switchMap(playlist => {
            return this.router.navigate([MyRoutes.Root, MyRoutes.Playlists]);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }else{
      this.songService
        .createSong(model)
        .pipe(
          switchMap(song => {
            console.log(song);
            return this.router.navigate([MyRoutes.Root, MyRoutes.Songs]);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }

  loadArtists() {
    this.artistService.getArtists()
      .subscribe((data: Artist[]) => {
        this.artistsList = data;
      });
  }

  loadGenres() {
    this.genreService.getGenres()
      .subscribe((data: Genre[]) => {
        this.genresList = data;
      });
  }

  onCancel() {
    this.router.navigate([MyRoutes.Root, MyRoutes.Songs]);
  }
}
