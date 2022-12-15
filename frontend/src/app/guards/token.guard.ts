import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree
} from '@angular/router';
import {TokenService} from "../services/token.service";
import {MyRoutes} from "../modules/my-routes";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate, CanActivateChild {
  constructor( private readonly tokenService: TokenService,
               private readonly router: Router) {
  }
  canActivate(): boolean | UrlTree {
    if (!!this.tokenService.getToken() && !!this.tokenService.getUser()) {
      return true;
    }
    return this.router.createUrlTree([MyRoutes.Root, MyRoutes.Login]);
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}
