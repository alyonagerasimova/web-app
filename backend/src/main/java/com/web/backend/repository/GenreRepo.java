package com.web.backend.repository;


import com.web.backend.entity.GenreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepo extends JpaRepository<GenreEntity, String> {
    GenreEntity getGenreById(String id);
}
