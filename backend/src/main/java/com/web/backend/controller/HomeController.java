package com.web.backend.controller;

import com.web.backend.service.ArtistService;
import com.web.backend.service.PlaylistService;
import com.web.backend.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/v1/home")
@RequiredArgsConstructor
public class HomeController {
    private final ArtistService artistService;
    private final PlaylistService playlistService;
    private final SongService songService;

    @GetMapping
    public List<?>[] getData() {
        return new List[]{songService.getSongs(), playlistService.getPlaylists(), artistService.getArtists()};
    }

}
