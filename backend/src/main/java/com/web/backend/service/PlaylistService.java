package com.web.backend.service;

import com.web.backend.dto.PlaylistDto;
import com.web.backend.repository.PlaylistRepo;
import com.web.backend.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepo playlistRepo;
    private final UserRepo userRepo;
    private final EntityManager entityManager;

    public List<PlaylistDto> getPlaylists() {
        return playlistRepo.findAll().stream().map(PlaylistDto::fromPlaylistEntity).collect(toList());
    }

    public PlaylistDto getPlaylist(String id) {
        return PlaylistDto.fromPlaylistEntity(playlistRepo.findPlaylistById(id));
    }

//    public PlaylistDto save(PlaylistDto playlist, String userId) {
//        UserEntity user = userRepo.findById(userId).get();
//        playlist.setUser(user);
//        return PlaylistDto.fromPlaylistEntity(playlistRepo.save(playlist));
//    }

    public PlaylistDto save(PlaylistDto playlistDto) {
        return PlaylistDto.fromPlaylistEntity(playlistRepo.save(playlistDto.toPlaylistEntity()));
    }

    public void delete(String id) {
        playlistRepo.deleteById(id);
    }
}
