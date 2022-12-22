package com.web.backend.dto;

import com.web.backend.entity.PlaylistEntity;
import com.web.backend.entity.SongEntity;
import lombok.Data;

import java.util.List;

@Data
public class PlaylistDto {
    private String id;
    private String playlistName;
    private String cover;
    private List<SongEntity> songs;

    public PlaylistEntity toPlaylistEntity() {
        PlaylistEntity playlist = new PlaylistEntity();
        playlist.setId(id);
        playlist.setPlaylistName(playlistName);
        playlist.setCover(cover);
        playlist.setSongs(songs);
        return playlist;
    }

    public static PlaylistDto fromPlaylistEntity(PlaylistEntity playlist) {
        PlaylistDto playlistDto = new PlaylistDto();
        playlistDto.setId(playlist.getId());
        playlistDto.setPlaylistName(playlist.getPlaylistName());
        playlistDto.setCover(playlist.getCover());
        playlistDto.setSongs(playlist.getSongs());
        return playlistDto;
    }
}
