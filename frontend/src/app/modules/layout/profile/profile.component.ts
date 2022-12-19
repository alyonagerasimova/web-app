import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../types";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

  public currentUser?: UserDto;

  constructor(private token: TokenService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()!;
  }
}
