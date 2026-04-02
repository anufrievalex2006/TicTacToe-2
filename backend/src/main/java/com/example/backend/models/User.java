package com.example.backend.models;

import com.example.backend.models.enums.Gender;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(nullable = false)
    private String id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private LocalDateTime birthday;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private String passwordHash;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private int points;

    @PrePersist
    protected void onCreate() {
        points = 0;
        if (id == null)
            id = UUID.randomUUID().toString();
        if (createdAt == null)
            createdAt = LocalDateTime.now();
    }
}
