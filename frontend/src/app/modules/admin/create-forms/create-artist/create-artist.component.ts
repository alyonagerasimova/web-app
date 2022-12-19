import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SongService} from "../../../../services/song.service";
import {ArtistService} from "../../../../services/artist.service";
import {Router} from "@angular/router";
import {ArtistCreate} from "../../../types";
import {finalize, switchMap} from "rxjs";
import {MyRoutes} from "../../../my-routes";

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.less']
})
export class CreateArtistComponent implements OnInit {

  isLoading = true;
  formGroup: FormGroup = this.formBuilder.group({
    artistName: ["", [Validators.required, Validators.minLength(2)]],
    photo: [""],
    songs: [],
  });

  constructor(private songService: SongService,
              private artistService: ArtistService,
              private formBuilder: FormBuilder,
              private readonly router: Router,) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const modelValue = this.formGroup.value;
    const model: ArtistCreate = {
      artistName: modelValue.artistName!,
      photo: modelValue.photo!,
      songs: modelValue.songs?.map((id: string) => id)!,
    };

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

  navigateOnArtist(id: string): Promise<unknown> {
    return this.router.navigate([MyRoutes.Root, MyRoutes.Artists, id]);
  }
}
