package com.web.backend.service;

import com.web.backend.dto.ArtistDto;
import com.web.backend.entity.ArtistEntity;
import com.web.backend.repository.ArtistRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepo artistRepo;
    private final DataSource dataSource;

    public List<ArtistDto> getArtists(){
        return artistRepo.findAll().stream().map(this::convertArtistIntoDto).collect(Collectors.toList());
    }

    public List<ArtistDto> getArtists(String name) {
        return (name == null ? artistRepo.findAll() : artistRepo.findAllByArtistNameContaining(name)).
                stream().map(ArtistDto::fromArtistEntity).collect(Collectors.toList());
    }

    private ArtistDto convertArtistIntoDto(ArtistEntity artistEntity) {
            ArtistDto artistDto = new ArtistDto();
            artistDto.setId(artistEntity.getId());
            artistDto.setArtistName(artistEntity.getArtistName());
            artistDto.setPhoto(artistEntity.getPhoto());
            return artistDto;
    }

    public ArtistDto getArtist(String id){
        return ArtistDto.fromArtistEntity(artistRepo.getArtistById(id));
    }

    public ArtistDto save(ArtistDto artistDto){
        return ArtistDto.fromArtistEntity(artistRepo.save(artistDto.toArtistEntity()));
    }

    public void delete(String id){
        artistRepo.deleteById(id);
    }

    public List<ArtistDto> select() {
        return new NamedParameterJdbcTemplate(dataSource)
                .query("select id, artist_name from artists", Collections.emptyMap(), (rs, rowNum) -> {
                    ArtistDto artist = new ArtistDto();
                    artist.setId(rs.getString("id"));
                    artist.setArtistName(rs.getString("artist_name"));
                    return artist;
                });
    }
}
