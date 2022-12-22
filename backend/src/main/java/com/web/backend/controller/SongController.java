package com.web.backend.controller;

import com.web.backend.dto.SongCreateDto;
import com.web.backend.dto.SongDto;
import com.web.backend.service.AlbumService;
import com.web.backend.service.ArtistService;
import com.web.backend.service.GenreService;
import com.web.backend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/v1/songs")
@RequiredArgsConstructor
public class SongController {
    private final SongService songService;
    private final ArtistService artistService;
    private final GenreService genreService;
    private final AlbumService albumService;

    @GetMapping
    public List<SongDto> getSongs() {
        return songService.getSongs();
    }

    @GetMapping("/{id}")
    public SongDto getSong(@PathVariable String id) {
        return songService.getSong(id);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createSong(@RequestBody SongCreateDto dto) {
        try {
            return ResponseEntity.ok(this.songService.createSong(dto));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> editSong(@RequestBody SongCreateDto dto, @PathVariable String id) {
        try {
            return ResponseEntity.ok(this.songService.editSong(dto, id));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

//    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public SongDto update(@PathVariable String id, @RequestBody SongDto dto) {
//        dto.setId(id);
//        return songService.save(dto);
//    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable String id) {
        songService.delete(id);
    }
}
