package com.web.backend.dto;

import com.web.backend.entity.AlbumEntity;
import lombok.Data;

@Data
public class AlbumDto {
    private String id;
    private String albumName;

    public AlbumEntity toAlbumEntity(){
        AlbumEntity album = new AlbumEntity();
        album.setAlbumName(albumName);
        album.setId(id);
        return album;
    }

    public static AlbumDto fromAlbumEntity(AlbumEntity album){
        AlbumDto albumDto = new AlbumDto();
        albumDto.setId(album.getId());
        albumDto.setAlbumName(albumDto.getAlbumName());
        return albumDto;
    }
}
