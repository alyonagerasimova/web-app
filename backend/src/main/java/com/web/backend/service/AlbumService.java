package com.web.backend.service;

import com.web.backend.dto.AlbumDto;
import com.web.backend.repository.AlbumRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import javax.sql.DataSource;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepo albumRepo;
    private final DataSource dataSource;

    public List<AlbumDto> getAlbums() {
        return albumRepo.findAll().stream().map(AlbumDto::fromAlbumEntity).collect(Collectors.toList());
    }

    public AlbumDto getAlbum(String id) {
        return AlbumDto.fromAlbumEntity(albumRepo.getAlbumById(id));
    }

    public AlbumDto save(AlbumDto albumDto) {
        return AlbumDto.fromAlbumEntity(albumRepo.save(albumDto.toAlbumEntity()));
    }

    public void delete(String id) {
        albumRepo.deleteById(id);
    }

    public List<AlbumDto> select() {
        return new NamedParameterJdbcTemplate(dataSource)
                .query("select id, album_name from albums", Collections.emptyMap(), (rs, rowNum) -> {
                    AlbumDto album = new AlbumDto();
                    album.setId(rs.getString("id"));
                    album.setAlbumName(rs.getString("album_name"));
                    return album;
                });
    }
}
