import {Component, OnInit} from '@angular/core';
import {Artist, Playlist, Song} from "../types";
import {MyRoutes} from "../my-routes";
import {HomeService} from "../../services/home.service";
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
  showAdminBoard = false;
  username?: string;

  constructor(private tokenStorage: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
  }


  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate([MyRoutes.Root, MyRoutes.Welcome]);
    // if(environment.production){
    //   window.location.href = "";
    // }else {
    //   window.location.reload();
    // }
  }

}
