import {Component, OnInit} from '@angular/core';
import {MyRoutes} from "../my-routes";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  artistPageUrl = [MyRoutes.Root, MyRoutes.Artists];
  songPageUrl = [MyRoutes.Root, MyRoutes.Songs];
  playlistPageUrl = [MyRoutes.Root, MyRoutes.Playlists];
  genrePageUrl = [MyRoutes.Root, MyRoutes.Genres];
  homeUrl = [MyRoutes.Root, MyRoutes.Home];
  username?: string;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser()!;
      this.username = user.username;
    }
  }


  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate([MyRoutes.Root, MyRoutes.Welcome]);
  }

}
