import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {AuthService} from "../../../services/auth.service";
import {TokenService} from "../../../services/token.service";
import {AuthRegisterInfo} from "./AuthRegisterInfo";
import {UserLogin, UserRegister} from "../../types";

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
    password: ['', [Validators.required, Validators.minLength(3)]],});
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

  public goBack(): void {
    this.location.go('/welcome');
  }

  public onSave(): void {
    const model = this.formModel.value as UserRegister;
    this.user = new AuthRegisterInfo(
      this.formModel.controls['username'].value,
      this.formModel.controls['email'].value,
      this.formModel.controls['password'].value);

    this.authService.register(this.user).subscribe({
      next: (data) => {
        this.isRegister = true;
        this.isLoading = false;
        console.log(data);
        return this.router.navigateByUrl("/home");
      },
      error: (error) => {
        this.isRegister = false;
        this.isLoading = false;
        this.errorMessage = "Проверьте корректность данных. " + error.message;
        console.log(this.errorMessage);
      }
    });

  }

}
