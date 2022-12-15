package com.web.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "geners")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenreEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "id")
    private String id;

    @Column(name = "genre_name", nullable = false)
    private String genreName;

    @OneToMany(mappedBy = "genre")
    private List<SongEntity> songs;
}
