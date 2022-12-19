import {Component, OnInit} from '@angular/core';
import {Artist} from "../../types";
import {ArtistService} from "../../../services/artist.service";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.less']
})
export class AllArtistsComponent implements OnInit {

  artistsList: Artist [] = [];
  isLoading = true;
  readonly isAdmin = this.getIsAdmin();
  error: string = '';
  defaultArtistPhoto = "../../../../assets/img/avatar.svg";

  constructor(private artistService: ArtistService,
              private readonly tokenService: TokenService,) {
  }

  ngOnInit(): void {
    this.artistService.getArtists()
      .subscribe({
        next: (data) => {
          this.artistsList = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.error = JSON.parse(err.error).message;
        }
      });
  }

  private getIsAdmin(): boolean {
    return this.tokenService.getUser()?.role === "ROLE_ADMIN";
  }
}
