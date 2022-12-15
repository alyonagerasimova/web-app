import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./modules/layout/home/home.component";
import {ProfileComponent} from "./modules/layout/profile/profile.component";
import {ArtistComponent} from "./modules/layout/artist/artist.component";
import {UserComponent} from "./modules/layout/user/user.component";
import {FormsModule} from "@angular/forms";
import {AdminComponent} from "./modules/admin/admin.component";
import {PlaylistComponent} from "./modules/layout/playlist/playlist.component";
import {AuthModule} from "./modules/auth/auth.module";
import {SongsComponent} from "./modules/layout/songs/songs.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatGridListModule} from "@angular/material/grid-list";
import { AllArtistsComponent } from './modules/layout/all-artists/all-artists.component';
import { LayoutComponent } from './modules/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistComponent,
    SongsComponent,
    PlaylistComponent,
    AdminComponent,
    UserComponent,
    ProfileComponent,
    AllArtistsComponent,
    LayoutComponent],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        AuthModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatGridListModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }