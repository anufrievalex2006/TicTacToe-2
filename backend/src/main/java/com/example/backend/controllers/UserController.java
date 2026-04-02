package com.example.backend.controllers;

import com.example.backend.dtos.requests.UserUpdateDto;
import com.example.backend.dtos.responses.UserResponse;
import com.example.backend.services.AuthService;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    private final AuthService authService;
    @Autowired
    public UserController(UserService service, AuthService authService) {
        this.service = service;
        this.authService = authService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> get() {
        return ResponseEntity.ok(service.get());
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(@RequestHeader("Authorization") String header) {
        String nick = authService.validateGetNickname(header);
        return ResponseEntity.ok(service.getByNickname(nick));
    }
    @PostMapping("/{id}/points")
    public ResponseEntity<Void> addPoints(@PathVariable String id, @RequestBody Map<String, Integer> body) {
        int points = body.getOrDefault("points", 0);
        service.addPoints(id, points);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable String id, @RequestBody UserUpdateDto req) {
        return ResponseEntity.ok(service.update(id, req));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
