package com.web.backend.service;

import com.web.backend.dto.ArtistDto;
import com.web.backend.repository.ArtistRepo;
import org.junit.jupiter.api.Test;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ArtistServiceTest {
    @Test
    public void toSelect() throws SQLException{
        ArtistRepo artistRepo = mock(ArtistRepo.class);
        DataSource dataSource = mock(DataSource.class);

        Connection connection = mock(Connection.class);
        when(dataSource.getConnection()).thenReturn(connection);

        PreparedStatement preparedStatement = mock(PreparedStatement.class);
        when(connection.prepareStatement("select id, artist_name from artists")).thenReturn(preparedStatement);

        ResultSet resultSet = mock(ResultSet.class);
        when(resultSet.next()).thenReturn(true).thenReturn(false);
        when(resultSet.getString("id")).thenReturn("402881d983f5ca2a0183f5ca4b6e0000").thenThrow(SQLException.class);
        when(resultSet.getString("artist_name")).thenReturn("Artist1").thenThrow(SQLException.class);
        when(preparedStatement.executeQuery()).thenReturn(resultSet);

        ArtistService artistService = new ArtistService(artistRepo, dataSource);
        List<ArtistDto> artists = artistService.select();
        assertEquals(1, artists.size());
        assertEquals("402881d983f5ca2a0183f5ca4b6e0000", artists.get(0).getId());
        assertEquals("Artist1", artists.get(0).getArtistName());
    }
}
