import {Component, OnInit} from '@angular/core';
import {Artist} from "../../types";
import {ArtistService} from "../../../services/artist.service";

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.less']
})
export class AllArtistsComponent implements OnInit {

  artistsList: Artist [] = [];
  isLoading = true;
  error: string = '';
  defaultArtistPhoto = "../../../../assets/img/avatar.svg";

  constructor(private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.artistService.getArtists()
      .subscribe({
        next: (data) => {
          this.artistsList = data;
          this.isLoading = true;
        },
        error: (err) => {
          this.isLoading = true;
          this.error = JSON.parse(err.error).message;
        }
      });
  }

}
