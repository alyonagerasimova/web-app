package com.web.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Data
@Getter
@Setter
public class SongCreateDto implements Serializable {
    private String songName;
    private String cover;
    private String source;
    private String artistId;
    private String genreId;
}
