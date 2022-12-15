import { Component, OnInit } from '@angular/core';
import {Artist, Playlist, Song} from "../types";
import {HomeService} from "./home.service";

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
  url: string = "https://cdn4.deliciouspeaches.com/get/music/20211030/Lyusya_CHebotina_-_Zachem_mne_solnce_Monako_73247109.mp3";

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getData()
      .subscribe(data => {
        this.songsList = data[0];
        this.playlistsList = data[1];
        this.artistsList = data[2];
        console.log(this.artistsList)
        this.isLoading = true;
      });
    console.log(this.isLoading);
  }

}
