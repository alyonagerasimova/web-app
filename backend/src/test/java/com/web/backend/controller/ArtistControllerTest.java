package com.web.backend.controller;

import com.web.backend.dto.ArtistDto;
import com.web.backend.service.ArtistService;
import org.junit.jupiter.api.Test;
import java.util.UUID;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ArtistControllerTest {
    @Test
    public void testCreate() {
        ArtistService artistService = mock(ArtistService.class);
        ArtistDto result = new ArtistDto();
        result.setArtistName("Artist");
        String id = UUID.randomUUID().toString();
        result.setId(id);
        when(artistService.save(any(ArtistDto.class))).thenReturn(result);

        ArtistController artistController = new ArtistController(artistService);
        ArtistDto artist = new ArtistDto();
        artist.setArtistName("Artist");
        artist = artistController.create(artist);
        assertEquals("Artist", artist.getArtistName());
        assertEquals(id, artist.getId());
    }
}
