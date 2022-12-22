import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {PlaylistService} from "../../../services/playlist.service";
import {TokenService} from "../../../services/token.service";
import {MyRoutes} from "../../my-routes";
import {Playlist} from "../../types";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.less"]
})
export class PlaylistsComponent implements OnInit {

  isLoading = true;
  playlistsList: Playlist[] = [];
  readonly isAdmin = this.getIsAdmin();
  public openPlaylistForm = () => this.router.navigate([MyRoutes.Root, MyRoutes.CreatePlaylist]);

  constructor(
    private readonly playlistService: PlaylistService,
    private readonly tokenService: TokenService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.playlistService.getPlaylists()
      .subscribe(data => {
        this.playlistsList = data;
        this.isLoading = false;
      });
  }

  private getIsAdmin(): boolean {
    return this.tokenService.getUser()?.role === "ROLE_ADMIN";
  }

  public getGenrePageUrl(id: string) {
    this.router.navigate([MyRoutes.Root, MyRoutes.Playlists, id]);
  }
}
