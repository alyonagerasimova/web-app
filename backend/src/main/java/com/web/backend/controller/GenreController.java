package com.web.backend.controller;

import com.web.backend.dto.GenreDto;
import com.web.backend.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/v1/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;

    @GetMapping
    public List<GenreDto> getAlbums() {
        return genreService.getGenres();
    }

    @GetMapping("/{id}")
    public GenreDto getAlbum(@PathVariable String id) {
        return genreService.getGenre(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public GenreDto create(@RequestBody GenreDto dto) {
        if (dto.getId() != null) {
            dto.setId(null);
        }
        return genreService.save(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public GenreDto update(@PathVariable String id,@RequestBody GenreDto dto) {
        dto.setId(id);
        return genreService.save(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable String id) {
        genreService.delete(id);
    }
}
