package com.web.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "artists")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtistEntity {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(name = "id")
    private String id;

    @Column(name = "artist_name", nullable = false, unique = true)
    private String artistName;

    @Column(name = "photo")
    private String photo;

    @OneToMany(mappedBy = "artist", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<SongEntity> songs;

    @OneToMany(mappedBy = "artist")
    private List<AlbumEntity> albums;

}
