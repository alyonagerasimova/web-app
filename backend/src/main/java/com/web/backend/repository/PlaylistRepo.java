package com.web.backend.repository;

import com.web.backend.entity.PlaylistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepo extends JpaRepository<PlaylistEntity, String> {
    PlaylistEntity findPlaylistById(String id);
}
