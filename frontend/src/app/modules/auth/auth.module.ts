import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {WelcomeComponent} from './welcome/welcome.component';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {httpInterceptorProviders} from "../../services/auth-interceptor";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    WelcomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule
  ],
  exports: [
    WelcomeComponent
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
    TokenService
  ]
})
export class AuthModule {
}
