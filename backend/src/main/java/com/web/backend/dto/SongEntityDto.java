package com.web.backend.dto;

import com.web.backend.entity.SongEntity;
import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link SongEntity} entity
 */
@Data
public class SongEntityDto implements Serializable {
    private final String id;
    private final String songName;
    private final String cover;
    private final double duration;
    private final String source;
}