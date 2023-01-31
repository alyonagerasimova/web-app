package com.web.backend.controller;

import com.web.backend.BackendApplication;
import com.web.backend.dto.ArtistDto;
import com.web.backend.entity.Role;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendApplication.class)
public class ArtistControllerIntTest {
    @Autowired
    private ArtistController artistController;

    @BeforeClass
    public static void init() {
        SecurityContextHolder.getContext().setAuthentication(new Authentication() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return Collections.singletonList(new SimpleGrantedAuthority(Role.ROLE_ADMIN.toString()));
            }

            @Override
            public Object getCredentials() {
                return null;
            }

            @Override
            public Object getDetails() {
                return null;
            }

            @Override
            public Object getPrincipal() {
                return "login";
            }

            @Override
            public boolean isAuthenticated() {
                return true;
            }

            @Override
            public void setAuthenticated(boolean b) throws IllegalArgumentException {
            }

            @Override
            public String getName() {
                return "login";
            }
        });
    }

    @Test
    @Transactional
    public void testArtistOperations() {
        List<ArtistDto> artists = artistController.getArtists(null);
        assertEquals(0, artists.size());

        ArtistDto artist = new ArtistDto();
        artist.setArtistName("Artist2");
        artistController.create(artist);
        artist = new ArtistDto();
        artist.setArtistName("Artist3");
        artistController.create(artist);
        artists = artistController.getArtists(null);
        assertEquals(2, artists.size());
        artists = artistController.getArtists("2");
        assertEquals(1, artists.size());

        artist = new ArtistDto();
        String id = UUID.randomUUID().toString();
        artist.setId(id);
        artist.setArtistName("Artist4");
        artistController.update(id, artist);
        artist = artistController.getArtist(id);
        assertEquals("Artist4", artist.getArtistName());

        artistController.delete(id);
        artists = artistController.getArtists(null);
        assertEquals(1, artists.size());
    }
}
