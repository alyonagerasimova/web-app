import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize, first, switchMap, tap} from "rxjs";
import {PlaylistService} from "../../../../services/playlist.service";
import {SongService} from "../../../../services/song.service";
import {MyRoutes} from "../../../my-routes";
import {Playlist, PlaylistCreate, Song} from "../../../types";

@Component({
  selector: "app-create-playlist",
  templateUrl: "./playlist-form.component.html",
  styleUrls: ["./playlist-form.component.less"]
})
export class PlaylistFormComponent implements OnInit {

  isLoading = true;
  formGroup: FormGroup = this.formBuilder.group({
    playlistName: ["", [Validators.required, Validators.minLength(2)]],
    cover: [""],
    songId: [[""], [Validators.required]],
  });
  songs: Song[] = [];
  playlistId: string | null | undefined;
  private playlist: Playlist | undefined;
  defaultImgPlaylist = "https://avatars.yandex.net/get-music-user-playlist/70586/r5l8ziDPSKyp02/m1000x1000?1641976255599";

  constructor(private readonly songService: SongService,
              private readonly playlistService: PlaylistService,
              private readonly route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly router: Router,) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          this.playlistId = paramMap.get("id");
          return this.playlistService.getPlaylist(this.playlistId || "");
        }),
        first(),
        tap(playlist => {
          this.playlist = playlist;
          this.pathForm(playlist);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();

    this.loadSongs();
  }


  private pathForm(playlist: Playlist) {
    this.formGroup.patchValue({
      playlistName: playlist.playlistName,
      cover: playlist.cover,
      songId: playlist.songId
    });
    this.formGroup.markAsPristine();
  }

  invalidateForm() {
    this.formGroup.markAsDirty();
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  onCancel() {
    this.router.navigate([MyRoutes.Root, MyRoutes.Playlists]);
  }

  onSubmit() {
    const modelValue = this.formGroup.value;
    const model: PlaylistCreate = {
      playlistName: modelValue.playlistName,
      cover: modelValue.cover,
      songs: modelValue.songs,
      playlistId: this.playlist?.id || undefined,
    };

    if (this.playlistId) {
      this.playlistService
        .updatePlaylist(model, this.playlistId)
        .pipe(
          switchMap(playlist => {
            return this.router.navigate([MyRoutes.Root, MyRoutes.Playlists]);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    } else {
      if (!model.cover) model.cover = this.defaultImgPlaylist;
      this.playlistService
        .createPlaylist(model)
        .pipe(
          switchMap(playlist => {
            return this.router.navigate([MyRoutes.Root, MyRoutes.Playlists]);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }

  navigateOnPlaylist(id: string): Promise<unknown> {
    return this.router.navigate([MyRoutes.Root, MyRoutes.Playlists, id]);
  }

  private loadSongs() {
    this.songService.getSongs()
      .pipe(
        tap((data: Song[]) => {
          this.songs = data;
        }),
      )
      .subscribe();
  }
}
