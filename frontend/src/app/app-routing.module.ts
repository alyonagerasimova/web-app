import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./modules/admin/admin.component";
import {HomeComponent} from "./modules/layout/home/home.component";
import {ProfileComponent} from "./modules/layout/profile/profile.component";
import {WelcomeComponent} from "./modules/auth/welcome/welcome.component";
import {LoginComponent} from "./modules/auth/login/login.component";
import {RegisterComponent} from "./modules/auth/register/register.component";
import {MyRoutes} from "./modules/my-routes";
import {AllArtistsComponent} from "./modules/layout/all-artists/all-artists.component";
import {SongsComponent} from "./modules/layout/songs/songs.component";
import {PlaylistComponent} from "./modules/layout/playlist/playlist.component";
import {TokenGuard} from "./guards/token.guard";
import {LayoutComponent} from "./modules/layout/layout.component";
import {GenresComponent} from "./modules/layout/genres/genres.component";
import {ArtistComponent} from "./modules/layout/artist/artist.component";

const routes: Routes = [
  {path: "", redirectTo: MyRoutes.Welcome, pathMatch: 'full'},
  {path: MyRoutes.Login, component: LoginComponent},
  {path: MyRoutes.Register, component: RegisterComponent},
  {path: MyRoutes.Welcome, component: WelcomeComponent},
  {
    path: "",
    canActivate: [TokenGuard],
    canActivateChild: [TokenGuard],
    children: [
      {
        path: "",
        component: LayoutComponent,
        children: [
          {path: MyRoutes.Artists, component: AllArtistsComponent},
          {path: MyRoutes.Songs, component: SongsComponent},
          {path: MyRoutes.Playlists, component: PlaylistComponent},
          {path: MyRoutes.Home, component: HomeComponent},
          {path: MyRoutes.Profile, component: ProfileComponent},
          {path: MyRoutes.Genre, component: GenresComponent},
          {path: MyRoutes.Artists + "/:id", component: ArtistComponent},
        ]
      },
      {path: MyRoutes.Admin, component: AdminComponent},

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
