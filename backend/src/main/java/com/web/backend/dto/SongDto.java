package com.web.backend.dto;

import com.web.backend.entity.SongEntity;
import lombok.Data;

@Data
public class SongDto {
    private String id;
    private String songName;
    private String cover;
    private String source;
    private String artistId;


    public SongEntity toSongEntity() {
        SongEntity song = new SongEntity();
        song.setId(id);
        song.setSongName(songName);
        song.setCover(cover);
        song.setSource(source);
//        song.setArtist(artistId);
        return song;
    }

    public static SongDto fromSongEntity(SongEntity song) {
        SongDto songDto = new SongDto();
        songDto.setId(song.getId());
        songDto.setSongName(song.getSongName());
        songDto.setCover(song.getCover());
        songDto.setSource(song.getSource());
        songDto.setArtistId(song.getArtist().getId());
        return songDto;
    }
}
