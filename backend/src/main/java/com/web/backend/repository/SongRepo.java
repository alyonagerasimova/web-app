package com.web.backend.repository;

import com.web.backend.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepo extends JpaRepository<SongEntity, String> {
    SongEntity getSongById(String id);
}
