package com.web.backend.repository;

import com.web.backend.entity.AlbumEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepo extends JpaRepository<AlbumEntity, String> {
    AlbumEntity getAlbumById(String id);
}
