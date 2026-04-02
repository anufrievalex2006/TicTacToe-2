package com.example.backend.services;

import com.example.backend.data.UserRepo;
import com.example.backend.dtos.requests.UserUpdateDto;
import com.example.backend.dtos.responses.UserResponse;
import com.example.backend.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo repo;
    @Autowired
    public UserService(UserRepo repo) {
        this.repo = repo;
    }

    public List<UserResponse> get() {
        return repo.findAll().stream().map(this::convertToResponse).toList();
    }
    public UserResponse getById(String id) {
        return convertToResponse(repo.findById(id).orElseThrow());
    }
    public UserResponse getByNickname(String nickname) {
        User u = repo.findByNickname(nickname)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToResponse(u);
    }
    public UserResponse update(String id, UserUpdateDto req) {
        User u = repo.findById(id).orElseThrow();
        u.setName(req.getName());
        u.setBirthday(req.getBirthday());
        u.setGender(req.getGender());
        u.setNickname(req.getNickname());
        return convertToResponse(repo.save(u));
    }
    public void delete(String id) {
        repo.deleteById(id);
    }
    public void addPoints(String id, int points) {
        User u = repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        u.setPoints(u.getPoints() + points);
        repo.save(u);
    }

    private UserResponse convertToResponse(User user) {
        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setBirthday(user.getBirthday());
        res.setGender(user.getGender());
        res.setNickname(user.getNickname());
        res.setPoints(user.getPoints());
        return res;
    }
}
