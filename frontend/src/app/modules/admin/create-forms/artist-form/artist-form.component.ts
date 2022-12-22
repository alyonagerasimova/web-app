import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongService} from "../../../../services/song.service";
import {ArtistService} from "../../../../services/artist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Artist, ArtistCreate} from "../../../types";
import {finalize, first, switchMap, tap} from "rxjs";
import {MyRoutes} from "../../../my-routes";

@Component({
  selector: 'app-create-artist',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.less']
})
export class ArtistFormComponent implements OnInit {
  isLoading = true;
  formGroup: FormGroup = this.formBuilder.group({
    artistName: ["", [Validators.required, Validators.minLength(2)]],
    photo: [""],
  });
  artistId: string | null | undefined;
  private artist: ArtistCreate | undefined;
  defaultArtistPhoto = "../../../../../assets/img/avatar.svg";

  constructor(private readonly songService: SongService,
              private readonly artistService: ArtistService,
              private readonly route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly router: Router,) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(paramMap => {
          this.artistId = paramMap.get("id");
          return this.artistService.getArtist(this.artistId || "");
        }),
        first(),
        tap(artist => {
          this.artist = artist;
          this.pathForm(artist);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }


  private pathForm(artist: Artist) {
    this.formGroup.patchValue({
      artistName: artist.artistName,
      photo: artist.photo
    });
    this.formGroup.markAsPristine();
  }

  invalidateForm() {
    this.formGroup.markAsDirty();
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }

  onCancel() {
    this.router.navigate([MyRoutes.Root, MyRoutes.Artists]);
  }

  onSubmit() {
    const modelValue = this.formGroup.value;
    const model: ArtistCreate = {
      artistName: modelValue.artistName!,
      photo: modelValue.photo!,
      artistId: this.artist?.artistId || undefined,
    };

    if (this.artistId) {
      this.artistService
        .updateArtist(model, this.artistId)
        .pipe(
          switchMap(artist => {
            return this.navigateOnArtist(artist.id);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    } else {
      if (!model.photo) model.photo = this.defaultArtistPhoto;
      this.artistService
        .createArtist(model)
        .pipe(
          switchMap(artist => {
            console.log(artist);
            return this.navigateOnArtist(artist.id);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }

  navigateOnArtist(id: string): Promise<unknown> {
    return this.router.navigate([MyRoutes.Root, MyRoutes.Artists, id]);
  }
}
