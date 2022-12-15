package com.web.backend.controller;

import com.web.backend.dto.ArtistDto;
import com.web.backend.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/v1/artists")
@RequiredArgsConstructor
public class ArtistController {
    private final ArtistService artistService;

    @GetMapping
    public List<ArtistDto> getArtists() {
        return artistService.getArtists();
    }

    @GetMapping("/artist")
    public List<ArtistDto> getArtists(@RequestParam(required = false) String name) {
        return artistService.getArtists(name);
    }

    @GetMapping("/{id}")
    public ArtistDto getArtist(@PathVariable String id) {
        return artistService.getArtist(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ArtistDto create(@RequestBody ArtistDto dto) {
        if (dto.getId() != null) {
            dto.setId(null);
        }
        return artistService.save(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ArtistDto update(@PathVariable String id,@RequestBody ArtistDto dto) {
        dto.setId(id);
        return artistService.save(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable String id) {
        artistService.delete(id);
    }
}
