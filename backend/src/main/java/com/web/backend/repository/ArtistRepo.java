package com.web.backend.repository;

import com.web.backend.entity.ArtistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepo extends JpaRepository<ArtistEntity, String> {
    ArtistEntity getArtistById(String id);
    List<ArtistEntity> findAllByArtistNameContaining(String name);
}
