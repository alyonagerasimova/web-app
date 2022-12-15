import { Component } from '@angular/core';
import {TokenService} from "./modules/auth/token.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;

  constructor(private tokenStorage: TokenService) {
    // window["apiurl"] = environment.production ? "" : "http://localhost:8080";
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.role = user.role;
      this.showAdminBoard = this.role == 'ROLE_ADMIN';
      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    if(environment.production){
      window.location.href = "";
    }else {
      window.location.reload();
    }
  }
}
