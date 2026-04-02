package com.example.backend.dtos.responses;

import com.example.backend.models.enums.Gender;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private String name;
    private LocalDateTime birthday;
    private Gender gender;
    private String nickname;
    private int points;
}
