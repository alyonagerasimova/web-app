import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { WelcomeComponent } from './welcome/welcome.component';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {httpInterceptorProviders} from "./auth-interceptor";
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";
import {HttpClientModule} from "@angular/common/http";

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
    HttpClientModule
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
