import {Component, OnInit} from '@angular/core';
import {Artist} from "../../types";
import {ArtistService} from "../../../services/artist.service";
import {TokenService} from "../../../services/token.service";
import {MyRoutes} from "../../my-routes";
import {Router} from "@angular/router";
import {finalize} from "rxjs";

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
  openFormArtistUrl = [MyRoutes.Root, MyRoutes.CreateArtist];

  constructor(private artistService: ArtistService,
              private readonly tokenService: TokenService,
              private readonly router: Router) {
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

  getArtistPageUrl(id: string) {
    this.router.navigate([MyRoutes.Root, MyRoutes.Artists, id]);
  }

  navigateToAristEditForm(id: string) {
    this.router.navigate([MyRoutes.Root, MyRoutes.CreateArtist, id]);
  }

  deleteArtist(id: string) {
    this.artistService
      .deleteArtist(id)
      .pipe(
        // switchMap(song => {
        //   return this.router.navigate([MyRoutes.Root, MyRoutes.Songs]);
        // }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }
}
