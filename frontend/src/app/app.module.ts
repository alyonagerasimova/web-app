import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./modules/layout/home/home.component";
import { PlaylistsComponent } from "./modules/layout/playlists/playlists.component";
import {ProfileComponent} from "./modules/layout/profile/profile.component";
import {ArtistComponent} from "./modules/layout/artist/artist.component";
import {UserComponent} from "./modules/layout/user/user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./modules/auth/auth.module";
import {SongsComponent} from "./modules/layout/songs/songs.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatGridListModule} from "@angular/material/grid-list";
import {AllArtistsComponent} from './modules/layout/all-artists/all-artists.component';
import {LayoutComponent} from './modules/layout/layout.component';
import {GenresComponent} from './modules/layout/genres/genres.component';
import {ArtistFormComponent} from './modules/admin/create-forms/artist-form/artist-form.component';
import {SongFormComponent} from './modules/admin/create-forms/song-form/song-form.component';
import {CreateAlbumComponent} from './modules/admin/create-forms/create-album/create-album.component';
import {PlaylistFormComponent} from './modules/admin/create-forms/playlist-form/playlist-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { GenreSongsComponent } from './modules/layout/genres/genre-songs/genre-songs.component';
import { PlaylistSongsComponent } from './modules/layout/playlists/playlist-songs/playlist-songs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistComponent,
    SongsComponent,
    PlaylistsComponent,
    UserComponent,
    ProfileComponent,
    AllArtistsComponent,
    LayoutComponent,
    GenresComponent,
    ArtistFormComponent,
    SongFormComponent,
    CreateAlbumComponent,
    PlaylistFormComponent,
    GenreSongsComponent,
    PlaylistSongsComponent,],
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
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
