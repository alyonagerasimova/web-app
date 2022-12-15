package com.web.backend.dto;

import com.web.backend.dto.SongEntityDto;
import com.web.backend.entity.ArtistEntity;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link ArtistEntity} entity
 */
@Data
public class ArtistEntityDto implements Serializable {
    private final String id;
    private final String artistName;
    private final String photo;
    private final List<SongEntityDto> songs;
}