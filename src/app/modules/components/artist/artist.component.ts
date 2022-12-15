import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Album, Artist, Song } from "../../types";
import { ArtistService } from "./artist.service";

@Component({
  selector: "app-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.less"]
})
export class ArtistComponent implements OnInit {

  public artist?: Artist;
  public id?: string;
  public isLoading = true;
  public songs?: Song[];
  public albums?: Album[];

  constructor(private artistService: ArtistService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.id = params["id"];
      }
    );
    this.artistService.getArtist(this.id!)
      .subscribe(
        data => {
          this.artist = data;
          this.isLoading = false;
        },
        err => {
          this.artist = JSON.parse(err.error).message;
        }
      );
  }

}
