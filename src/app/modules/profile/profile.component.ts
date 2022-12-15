import { Component, OnInit } from '@angular/core';
import {JwtResponse} from "../types";
import {TokenService} from "../auth/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  public currentUser?: JwtResponse;

  constructor(private token: TokenService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
}
