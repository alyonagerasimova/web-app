import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {TokenService} from "../../../services/token.service";
import {AuthLoginInfo} from "./AuthLoginInfo";
import {UserLogin} from "../../types";

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
    private tokenStorage: TokenService,
    private readonly router: Router) {
  }

  private buildAuthForm(): FormGroup {
    return this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(2)]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLogin = true;
      this.roles = this.tokenStorage.getUser().roles;
      console.log("Get token");
    }
  }

  public goBack(): void {
    this.location.go("/auth");
  }

  public onSubmit() {
    const model = this.formGroup.value as UserLogin;
    this.formGroup.markAsDirty();
    this.formGroup.updateValueAndValidity();
    this.user = new AuthLoginInfo(this.formGroup.controls["username"].value, this.formGroup.controls["password"].value);

    this.authService.login(this.user)
      .subscribe({
        next: (data) => {
          this.tokenStorage.saveToken(data.jwt);
          this.tokenStorage.saveUser(data);
          this.isLogin = true;
          this.isLoading = false;
          this.roles = this.tokenStorage.getUser().roles;
          return this.router.navigateByUrl("/home");
        },
        error: (error) => {
          this.isLogin = false;
          this.isLoading = false;
          this.errorMessage = "Проверьте корректность данных. " + error.message;
          console.log(this.errorMessage);
        }
      });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
