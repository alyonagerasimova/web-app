package com.web.backend.dto;

import com.web.backend.entity.GenreEntity;
import lombok.Data;

@Data
public class GenreDto {
    private String id;
    private String genreName;

    public GenreEntity toGenreEntity() {
        GenreEntity genre = new GenreEntity();
        genre.setGenreName(genreName);
        genre.setId(id);
        return genre;
    }

    public static GenreDto fromGenreEntity(GenreEntity genre) {
        GenreDto genreDto = new GenreDto();
        genreDto.setId(genre.getId());
        genreDto.setGenreName(genre.getGenreName());
        return genreDto;
    }
}
