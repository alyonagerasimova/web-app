import {Component, OnInit} from '@angular/core';
import {Artist, Playlist, Song} from "../../types";
import {HomeService} from "../../../services/home.service";
import {MyRoutes} from "../../my-routes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
  artistsList: Artist [] = [];
  songsList: Song[] = [];
  playlistsList: Playlist[] = [];
  id: string = '';

  constructor(private homeService: HomeService, private router: Router) {
  }

  ngOnInit(): void {
    this.homeService.getData()
      .subscribe(data => {
        this.songsList = data[0].slice(0, 3);
        this.playlistsList = data[1].slice(0, 3);
        this.artistsList = data[2].slice(0, 3);
        this.isLoading = false;
      });
  }

  getArtistPageUrl(id: string) {
    this.router.navigate([MyRoutes.Root, MyRoutes.Artists, id]);
  }
}
