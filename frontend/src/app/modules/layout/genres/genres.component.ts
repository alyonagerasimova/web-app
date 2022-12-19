import {Component, OnInit} from '@angular/core';
import {Genre} from "../../types";
import {GenreService} from "../../../services/genre.service";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.less']
})
export class GenresComponent implements OnInit {
  isLoading = true;
  genresList: Genre[] = [];

  constructor(private genreService: GenreService) {
  }

  ngOnInit(): void {
    this.genreService.getGenres()
      .subscribe(data => {
        this.genresList = data;
        this.isLoading = false;
      });
  }

}
