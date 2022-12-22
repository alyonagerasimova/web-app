import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { MyRoutes } from "../../my-routes";
import {Genre} from "../../types";
import {GenreService} from "../../../services/genre.service";
import {colors} from "./colors";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.less'],
})
export class GenresComponent implements OnInit {
  isLoading = true;
  genresList: Genre[] = [];
  backColor = (i: number) => colors[i];

  constructor(private genreService: GenreService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.genreService.getGenres()
      .subscribe(data => {
        this.genresList = data;
        this.isLoading = false;
      });
  }

  getGenrePageUrl(id: string) {
    this.router.navigate([MyRoutes.Root, MyRoutes.Genres, id]);
  }
}
