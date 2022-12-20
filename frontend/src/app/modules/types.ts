export type UserRegister = {
  username: string,
  email: string,
  password: string
}
export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';

export type UserProfile = {
  username: string,
  email: string,
  password: string
  userRole?: UserRole;
};

export type UserLogin = {
  username: string,
  password: string
}

export type JwtResponse = {
  jwt: string,
} & UserDto;

export type UserDto = {
  role: 'ROLE_ADMIN' | 'ROLE_USER'
  id: string,
  username: string,
  email: string,
}

export type Artist = {
  id: string,
  artistName: string,
  photo: string,
  songs: Song[],
  albums: Album[]
}

export type ArtistCreate = {
  artistName: string,
  photo: string,
  songs: string[]
}

export type Song = {
  id: string,
  songName: string,
  source: string,
  cover: string,
  artistId: string,
  artistName?: string
}

export type SongCreate = {
  songName: string,
  source: string,
  cover: string,
  artistId?: string,
  genreId?: string
}


export type Playlist = {
  id: string,
  playlistName: string,
}

export type Album = {
  id: string,
  albumName: string,
  cover: string
}

export type Genre = {
  id: string,
  genreName: string
}
