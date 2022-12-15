import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {AuthService} from "../auth.service";
import {TokenService} from "../token.service";
import {AuthRegisterInfo} from "./AuthRegisterInfo";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  private isRegister = false;
  private user!: AuthRegisterInfo;
  public formModel: FormGroup = this.formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(2)],
    ],
    email: [
      '',
      [Validators.required, Validators.minLength(2)],
    ],
    password: ['', [
      Validators.required, Validators.minLength(5)]],
  });
  private errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService,
    private tokenStorage: TokenService) {}

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
      this.user = new AuthRegisterInfo(
        this.formModel.controls['username'].value,
        this.formModel.controls['email'].value,
        this.formModel.controls['password'].value);

      this.authService.register(this.user).subscribe(
        data => {
          this.isRegister = true;
          console.log("Login!");
        },
        error => {
          this.isRegister = false;
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
        }
      );

  }

}
