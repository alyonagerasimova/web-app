package com.web.backend.dto;

import com.web.backend.entity.GenreEntity;
import lombok.Data;

@Data
public class GenreDto {
    private String id;
    private String genreName;

    public GenreEntity toGenreEntity(){
        GenreEntity genre = new GenreEntity();
        genre.setGenreName(genreName);
        genre.setId(id);
        return genre;
    }

    public static GenreDto fromGenreEntity(GenreEntity album){
        GenreDto genreDto = new GenreDto();
        genreDto.setId(album.getId());
        genreDto.setGenreName(genreDto.getGenreName());
        return genreDto;
    }
}
