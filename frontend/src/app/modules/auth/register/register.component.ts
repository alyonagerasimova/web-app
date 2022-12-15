import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {AuthService} from "../../../services/auth.service";
import {TokenService} from "../../../services/token.service";
import {AuthRegisterInfo} from "./AuthRegisterInfo";
import {UserRegister} from "../../types";
import {catchError, finalize, switchMap, throwError} from "rxjs";
import {MyRoutes} from "../../my-routes";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  public isRegister = false;
  public isLoading = true;
  private user!: AuthRegisterInfo;
  public formModel: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2)],],
    email: ['', [Validators.required, Validators.minLength(2)],],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private tokenStorage: TokenService,
    private router: Router) {
  }

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isRegister = true;
    //   console.log("Get token");
    // }
  }

  public onSave(): void {
    const model = this.formModel.value;
    this.user = new AuthRegisterInfo(
      model['username'],
      model['email'],
      model['password']);

    this.authService.register(this.user)
      .pipe(
        switchMap(() => {
          return this.router.navigate([MyRoutes.Root, MyRoutes.Home]);
        }),
        catchError(error => {
          this.isRegister = false;
          this.errorMessage = "Проверьте корректность данных. " + error.message;
          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }
}
