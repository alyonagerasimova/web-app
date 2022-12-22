package com.web.backend.controller;

import com.web.backend.dto.PlaylistDto;
import com.web.backend.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/v1/playlists")
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistService playlistService;

    @GetMapping("")
    public List<PlaylistDto> getPlaylists() {
        return playlistService.getPlaylists();
    }

    @GetMapping(path = "/{id}")
    public PlaylistDto getPlaylist(@PathVariable String id) {
        return playlistService.getPlaylist(id);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public PlaylistDto create(@RequestBody PlaylistDto dto) {
        if (dto.getId() != null) {
            dto.setId(null);
        }
        return playlistService.save(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePlaylist(@PathVariable String id){
       playlistService.delete(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PlaylistDto update(@PathVariable String id,@RequestBody PlaylistDto dto) {
        dto.setId(id);
        return playlistService.save(dto);
    }

}
