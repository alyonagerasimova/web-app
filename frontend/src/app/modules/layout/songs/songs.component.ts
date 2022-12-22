import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {Artist, Song} from "../../types";
import {SongService} from "../../../services/song.service";
import {TokenService} from "../../../services/token.service";
import {MyRoutes} from "../../my-routes";
import {ArtistService} from "../../../services/artist.service";

@Component({
  selector: 'app-song',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {
  isLoading = true;
  songsList: Song[] = [];
  readonly isAdmin = this.getIsAdmin();
  defaultImg = "../../../../assets/img/song_default.jpg";
  artistName: string[] = [];

  constructor(private songService: SongService,
              private readonly tokenService: TokenService,
              private readonly router: Router,
              private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.songService.getSongs()
      .subscribe(data => {
        this.songsList = data;
        this.isLoading = false;
      });
    this.songsList.map(song => {
      return this.artistService.getArtist(song.artistId)
        .subscribe((data: Artist) => {
          this.artistName.push(data.artistName);
        })
    });
  }

  private getIsAdmin(): boolean {
    return this.tokenService.getUser()?.role === "ROLE_ADMIN";
  }
  openFormArtistUrl = () => this.router.navigate([MyRoutes.Root, MyRoutes.CreateSong]);
}

