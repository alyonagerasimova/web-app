package com.web.backend.dto;

import com.web.backend.entity.ArtistEntity;
import lombok.Data;

@Data
public class ArtistDto {
    private String id;
    private String artistName;
    private String photo;

    public ArtistEntity toArtistEntity(){
        ArtistEntity artist = new ArtistEntity();
        artist.setId(id);
        artist.setArtistName(artistName);
        artist.setPhoto(photo);
        return artist;
    }

    public static ArtistDto fromArtistEntity(ArtistEntity artist){
        ArtistDto artistDto = new ArtistDto();
        artistDto.setId(artist.getId());
        artistDto.setArtistName(artist.getArtistName());
        artistDto.setPhoto(artist.getPhoto());
        return artistDto;
    }
}
