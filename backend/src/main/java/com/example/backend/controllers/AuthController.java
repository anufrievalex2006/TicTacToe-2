package com.example.backend.controllers;

import com.example.backend.dtos.requests.LoginDto;
import com.example.backend.dtos.requests.RegisterDto;
import com.example.backend.dtos.responses.TokenResponse;
import com.example.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService service;
    @Autowired
    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody RegisterDto req) {
        return ResponseEntity.ok(service.register(req));
    }
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginDto req) {
        return ResponseEntity.ok(service.login(req));
    }
}
