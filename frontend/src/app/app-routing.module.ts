import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlaylistFormComponent } from "./modules/admin/create-forms/playlist-form/playlist-form.component";
import { GenreSongsComponent } from "./modules/layout/genres/genre-songs/genre-songs.component";
import { HomeComponent } from "./modules/layout/home/home.component";
import { PlaylistSongsComponent } from "./modules/layout/playlists/playlist-songs/playlist-songs.component";
import { ProfileComponent } from "./modules/layout/profile/profile.component";
import { WelcomeComponent } from "./modules/auth/welcome/welcome.component";
import { LoginComponent } from "./modules/auth/login/login.component";
import { RegisterComponent } from "./modules/auth/register/register.component";
import { MyRoutes } from "./modules/my-routes";
import { AllArtistsComponent } from "./modules/layout/all-artists/all-artists.component";
import { SongsComponent } from "./modules/layout/songs/songs.component";
import { PlaylistsComponent } from "./modules/layout/playlists/playlists.component";
import { TokenGuard } from "./guards/token.guard";
import { LayoutComponent } from "./modules/layout/layout.component";
import { GenresComponent } from "./modules/layout/genres/genres.component";
import { ArtistComponent } from "./modules/layout/artist/artist.component";
import { ArtistFormComponent } from "./modules/admin/create-forms/artist-form/artist-form.component";
import { AdminGuard } from "./guards/admin.guard";
import { SongFormComponent } from "./modules/admin/create-forms/song-form/song-form.component";

const routes: Routes = [
  { path: "", redirectTo: MyRoutes.Welcome, pathMatch: "full" },
  { path: MyRoutes.Login, component: LoginComponent },
  { path: MyRoutes.Register, component: RegisterComponent },
  { path: MyRoutes.Welcome, component: WelcomeComponent },
  {
    path: "",
    canActivate: [TokenGuard],
    canActivateChild: [TokenGuard],
    children: [
      {
        path: "",
        component: LayoutComponent,
        children: [
          { path: MyRoutes.Artists, component: AllArtistsComponent },
          {
            path: MyRoutes.CreateArtist,
            canActivate: [AdminGuard],
            component: ArtistFormComponent
          },
          {
            path: MyRoutes.CreateArtist + "/:id",
            canActivate: [AdminGuard],
            component: ArtistFormComponent
          },
          { path: MyRoutes.Artists + "/:id", component: ArtistComponent },

          { path: MyRoutes.Songs, component: SongsComponent },
          {
            path: MyRoutes.CreateSong,
            canActivate: [AdminGuard],
            component: SongFormComponent
          },
          {
            path: MyRoutes.CreateSong + "/:id",
            canActivate: [AdminGuard],
            component: SongFormComponent
          },
          { path: MyRoutes.Playlists, component: PlaylistsComponent },
          { path: MyRoutes.Playlists + "/:id", component: PlaylistSongsComponent },
          {
            path: MyRoutes.CreatePlaylist,
            canActivate: [AdminGuard],
            component: PlaylistFormComponent
          },
          {
            path: MyRoutes.CreatePlaylist + "/:id",
            canActivate: [AdminGuard],
            component: PlaylistFormComponent
          },
          { path: MyRoutes.Home, component: HomeComponent },
          { path: MyRoutes.Profile, component: ProfileComponent },
          { path: MyRoutes.Genres, component: GenresComponent },
          { path: MyRoutes.Genres + "/:id", component: GenreSongsComponent },

        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
