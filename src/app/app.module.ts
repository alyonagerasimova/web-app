import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./modules/components/header/header.component";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./modules/home/home.component";
import {ProfileComponent} from "./modules/profile/profile.component";
import {ArtistComponent} from "./modules/components/artist/artist.component";
import {UserComponent} from "./modules/user/user.component";
import {FormsModule} from "@angular/forms";
import {AdminComponent} from "./modules/admin/admin.component";
import {PlaylistComponent} from "./modules/components/playlist/playlist.component";
import {AuthModule} from "./modules/auth/auth.module";
import {SongComponent} from "./modules/components/song/song.component";
import {SidebarComponent} from "./modules/components/sidebar/sidebar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistComponent,
    SongComponent,
    PlaylistComponent,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    UserComponent,
    ProfileComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
