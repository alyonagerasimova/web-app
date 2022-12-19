import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../services/token.service";
import {UserDto} from "../../types";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  currentUser?: UserDto;

  constructor(private token: TokenService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()!;
  }
}
