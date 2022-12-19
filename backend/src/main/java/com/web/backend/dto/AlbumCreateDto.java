package com.web.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class AlbumCreateDto {
    private String id;
    private String albumName;
    private List<String> songs;
}
