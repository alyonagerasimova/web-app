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
  id: string,
  username: string,
  email: string,
  role: string,
}

export type Artist = {
  id: string,
  artistName: string,
  photo: string,
}

export type Song = {
  id: string,
  songName: string,
  source: string
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
