import {Component} from '@angular/core';
import {TokenService} from "./services/token.service";

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
}
