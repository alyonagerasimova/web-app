package com.web.backend.dto;

import com.web.backend.entity.PlaylistEntity;
import lombok.Data;

@Data
public class PlaylistDto {
    private String id;
    private String playlistName;

    public PlaylistEntity toPlaylistEntity(){
        PlaylistEntity playlist = new PlaylistEntity();
        playlist.setId(id);
        playlist.setPlaylistName(playlistName);
        return playlist;
    }

    public static PlaylistDto fromPlaylistEntity(PlaylistEntity playlist){
        PlaylistDto playlistDto = new PlaylistDto();
        playlistDto.setId(playlist.getId());
        playlistDto.setPlaylistName(playlist.getPlaylistName());
        return playlistDto;
    }
}
