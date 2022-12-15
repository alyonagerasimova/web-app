import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {TokenService} from "../../../services/token.service";
import {AuthLoginInfo} from "./AuthLoginInfo";
import {UserLogin} from "../../types";
import {catchError, switchMap, throwError} from "rxjs";
import {MyRoutes} from "../../my-routes";

@Component({
  selector: "app-login.component",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {

  public isLogin = false;
  public isLoading = true;
  private user!: AuthLoginInfo;
  public roles: string[] = [];
  public errorMessage = '';
  public formGroup = this.buildAuthForm();

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly router: Router) {
  }

  private buildAuthForm(): FormGroup {
    return this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(2)]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.tokenService.signOut();
  }

  public onSubmit() {
    const model = this.formGroup.value;
    this.user = new AuthLoginInfo(model["username"], model["password"]);

    this.authService.login(this.user)
      .pipe(
        switchMap(() => {
          return this.router.navigate([MyRoutes.Root, MyRoutes.Home]);
        }),
        catchError(error => {
          this.isLoading = false;
          this.isLogin = false;
          this.errorMessage = "Проверьте корректность данных!";
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
