import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Album, Artist, Song} from "../../types";
import {ArtistService} from "../../../services/artist.service";
import {of, switchMap} from "rxjs";

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
  defaultArtistPhoto = "../../../../assets/img/avatar.svg";

  constructor(private artistService: ArtistService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadArtist();
  }

  loadArtist() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (!id) {
            return of(null);
          }
          return this.artistService.getArtist(params.get('id')!);
        })
      )
      .subscribe({
        next: data => {
          this.artist = data;
          this.isLoading = false;
        },
        error: err => {
          this.artist = JSON.parse(err.error).message;
        }
      });
  }
}
