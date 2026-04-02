package com.example.backend.dtos.requests;

import lombok.Data;

@Data
public class LoginDto {
    private String nickname;
    private String password;
}
