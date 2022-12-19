import {Component, OnInit} from '@angular/core';
import {Song} from "../../types";
import {SongService} from "../../../services/song.service";

@Component({
  selector: 'app-song',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {
  isLoading = true;
  songsList: Song[] = [];

  constructor(
    private songService: SongService
  ) {
  }

  ngOnInit(): void {
    this.songService.getSongs()
      .subscribe(data => {
        this.songsList = data;
        this.isLoading = false;
      });
  }

}
