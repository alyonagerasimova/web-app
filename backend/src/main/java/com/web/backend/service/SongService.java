package com.web.backend.service;

import com.web.backend.dto.SongCreateDto;
import com.web.backend.dto.SongDto;
import com.web.backend.entity.SongEntity;
import com.web.backend.repository.SongRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SongService {

    private final SongRepo songRepo;
    private final EntityManager entityManager;

    public List<SongDto> getSongs() {
        return songRepo.findAll().stream().map(SongDto::fromSongEntity).collect(Collectors.toList());
    }

    public SongDto getSong(String id) {
        return SongDto.fromSongEntity(songRepo.getSongById(id));
    }

    public SongDto save(SongDto songDto) {
        return SongDto.fromSongEntity(songRepo.save(songDto.toSongEntity()));
    }

    public SongDto createSong(SongCreateDto songDto) {
        return SongDto.fromSongEntity(this.songRepo.save(songDto.toSongEntity()));
    }

    public SongDto editSong(SongCreateDto songCreateDto, String songId) throws Exception {
        SongEntity oldSong = this.songRepo.findById(songId).orElseThrow();
        oldSong.setSongName(songCreateDto.getSongName());
        oldSong.setCover(songCreateDto.getCover());
        oldSong.setSource(songCreateDto.getSource());
        return SongDto.fromSongEntity(this.songRepo.save(oldSong));
    }

    public void delete(String id) {
        songRepo.deleteById(id);
    }

    public List<SongEntity> findSongs(List<String> ids) {
        return this.songRepo.findAllById(ids);
    }
}
