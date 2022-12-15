package com.web.backend.controller;

import com.web.backend.dto.SongDto;
import com.web.backend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/v1/songs")
@RequiredArgsConstructor
public class SongController {
    private final SongService songService;

    @GetMapping
    public List<SongDto> getSongs() {
        return songService.getSongs();
    }

    @GetMapping("/{id}")
    public SongDto getSong(@PathVariable String id) {
        return songService.getSong(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public SongDto create(@RequestBody SongDto dto) {
        if (dto.getId() != null) {
            dto.setId(null);
        }
        return songService.save(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public SongDto update(@PathVariable String id,@RequestBody SongDto dto) {
        dto.setId(id);
        return songService.save(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable String id) {
        songService.delete(id);
    }
}
