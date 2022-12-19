import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {SongService} from "../../services/song.service";
import {ArtistService} from "../../services/artist.service";
import {AlbumService} from "../../services/album.service";
import {PlaylistService} from "../../services/playlist.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {


  constructor(private songService: SongService,
              private artistService: ArtistService,
              private albumService: AlbumService,
              private playlistService: PlaylistService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private readonly router: Router,) {
  }

  ngOnInit(): void {
  }

}
