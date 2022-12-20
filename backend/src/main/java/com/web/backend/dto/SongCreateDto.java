package com.web.backend.dto;

import com.web.backend.entity.ArtistEntity;
import com.web.backend.entity.GenreEntity;
import com.web.backend.entity.SongEntity;
import lombok.Data;

import javax.persistence.EntityManager;

@Data
public class SongCreateDto {
    private String songName;
    private String cover;
    private String source;
    private String artistId;
    private String genreId;
//    private String albumId;
//    private String playlistId;

    private final EntityManager entityManager;

    public SongEntity toSongEntity() {
        SongEntity song = new SongEntity();
        song.setSongName(songName);
        song.setSource(source);
        song.setCover(cover);
        song.setGenre(entityManager.getReference(GenreEntity.class, genreId));
        song.setArtist(entityManager.getReference(ArtistEntity.class, artistId));
//        song.setPlaylist(entityManager.getReference(PlaylistEntity.class, playlistId));
//        song.setAlbum(entityManager.getReference(AlbumEntity.class, albumId));
        return song;
    }
}
