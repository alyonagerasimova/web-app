import {Component, OnInit} from '@angular/core';
import {Artist, Playlist, Song} from "../../types";
import {HomeService} from "../../../services/home.service";
import {AuthService} from "../../../services/auth.service";
import {TokenService} from "../../../services/token.service";
import {environment} from "../../../../environments/environment";
import {MyRoutes} from "../../my-routes";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  artistsList: Artist [] = [];
  songsList: Song[] = [];
  playlistsList: Playlist[] = [];

  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;

  artistPageUrl: string = "../" + MyRoutes.Artists;
  songPageUrl: string = "../" + MyRoutes.Songs;
  playlistPageUrl: string = "../" + MyRoutes.Playlists;

  constructor(private homeService: HomeService,  private tokenStorage: TokenService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    this.homeService.getData()
      .subscribe(data => {
        this.songsList = data[0].splice(0, 2);
        this.playlistsList = data[1].splice(0, 2);
        this.artistsList = data[2].splice(0, 2);
        console.log(this.artistsList)
        this.isLoading = true;
      });
    console.log(this.isLoading);

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.role = user.role;
      this.showAdminBoard = this.role == 'ROLE_ADMIN';
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    // if(environment.production){
    //   window.location.href = "";
    // }else {
    //   window.location.reload();
    // }
  }


}
