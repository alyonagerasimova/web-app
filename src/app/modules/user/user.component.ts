import { Component, OnInit } from '@angular/core';
import { TokenService } from "../auth/token.service";
import { JwtResponse } from "../types";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  currentUser?: JwtResponse;

  constructor(private token: TokenService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }

}
