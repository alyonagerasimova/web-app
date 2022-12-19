import {Component, OnInit} from '@angular/core';
import {Song} from "../../types";
import {SongService} from "../../../services/song.service";
import {TokenService} from "../../../services/token.service";
import {MyRoutes} from "../../my-routes";

@Component({
  selector: 'app-song',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {
  isLoading = true;
  songsList: Song[] = [];
  readonly isAdmin = this.getIsAdmin();
  openFormArtistUrl = [MyRoutes.Root, MyRoutes.CreateSong];
  defaultImg = "../../../../assets/img/song_default.jpg";

  constructor(private songService: SongService,
              private readonly tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.songService.getSongs()
      .subscribe(data => {
        this.songsList = data;
        this.isLoading = false;
      });
  }

  private getIsAdmin(): boolean {
    return this.tokenService.getUser()?.role === "ROLE_ADMIN";
  }
}
