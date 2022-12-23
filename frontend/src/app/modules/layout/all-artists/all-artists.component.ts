import {Component, OnInit} from '@angular/core';
import {Artist} from "../../types";
import {ArtistService} from "../../../services/artist.service";
import {TokenService} from "../../../services/token.service";
import {MyRoutes} from "../../my-routes";
import {Router} from "@angular/router";
import {finalize, tap} from "rxjs";
import {SongService} from "../../../services/song.service";

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
  openFormArtistUrl = () => this.router.navigate([MyRoutes.Root, MyRoutes.CreateArtist]);
  private songsName: string[] = [];

  constructor(private artistService: ArtistService,
              private readonly tokenService: TokenService,
              private readonly songService: SongService,
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

  deleteArtist(artist: Artist) {
    this.songService.getSongs()
      .pipe(
        tap((sings) => {
          this.songsName = sings.filter(song => song.artistId === artist.id).map(song => song?.songName);
        }),
        finalize(() => {
          if (confirm("Вы действительно хотите удалить " + artist.artistName + ": " + this.songsName)) {
            this.artistService.deleteArtist(artist.id)
              .pipe(
                tap(() => {
                  this.artistsList = this.artistsList.filter(singer => singer !== artist);
                })
              ).subscribe();
          }
        })
      )
      .subscribe();
  }
}
