package com.web.backend.service;

import com.web.backend.dto.GenreDto;
import com.web.backend.repository.GenreRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepo genreRepo;

    public List<GenreDto> getGenres(){
        return genreRepo.findAll().stream().map(GenreDto::fromGenreEntity).collect(Collectors.toList());
    }

    public GenreDto getGenre(String id){
        return GenreDto.fromGenreEntity(genreRepo.getGenreById(id));
    }

    public GenreDto save(GenreDto genreDto){
        return GenreDto.fromGenreEntity(genreRepo.save(genreDto.toGenreEntity()));
    }

    public void delete(String id){
        genreRepo.deleteById(id);
    }
}
