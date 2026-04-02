package com.example.backend.dtos.requests;

import com.example.backend.models.enums.Gender;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserUpdateDto {
    private String name;
    private LocalDateTime birthday;
    private Gender gender;
    private String nickname;
}
