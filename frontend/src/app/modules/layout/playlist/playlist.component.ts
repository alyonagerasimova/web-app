import {Component, OnInit} from '@angular/core';
import {Playlist} from "../../types";
import {PlaylistService} from "../../../services/playlist.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less']
})
export class PlaylistComponent implements OnInit {

  isLoading = true;
  playlistsList: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.playlistService.getPlaylists()
      .subscribe(data => {
        this.playlistsList = data;
        this.isLoading = false;
      });
  }
}
