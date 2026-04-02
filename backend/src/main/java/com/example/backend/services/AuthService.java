package com.example.backend.services;

import com.example.backend.data.UserRepo;
import com.example.backend.dtos.requests.LoginDto;
import com.example.backend.dtos.requests.RegisterDto;
import com.example.backend.dtos.responses.TokenResponse;
import com.example.backend.models.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Service
public class AuthService {
    private final UserRepo repo;
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration:86400000}")
    private long expiration;

    @Autowired
    public AuthService(UserRepo repo) {
        this.repo = repo;
    }

    public TokenResponse register(RegisterDto req) {
        if (repo.findByNickname(req.getNickname()).isPresent())
            throw new RuntimeException("Nickname already exists");

        User u = new User();
        u.setName(req.getName());
        u.setBirthday(req.getBirthday());
        u.setGender(req.getGender());
        u.setNickname(req.getNickname());
        u.setPasswordHash(hashPassword(req.getPassword()));

        String token = generateJwt(repo.save(u).getNickname());
        TokenResponse res = new TokenResponse();
        res.setToken(token);
        return res;
    }
    public TokenResponse login(LoginDto req) {
        User u = repo.findByNickname(req.getNickname())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!hashPassword(req.getPassword()).equals(u.getPasswordHash()))
            throw new RuntimeException("Incorrect password");
        String token = generateJwt(u.getNickname());
        TokenResponse res = new TokenResponse();
        res.setToken(token);
        return res;
    }
    public String validateGetNickname(String header) {
        if (header == null || !header.startsWith("Bearer "))
            throw new RuntimeException("Auth header is either missing or invalid");

        String token = header.substring(7).trim();
        try {
            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        }
        catch (Exception e) {
            throw new RuntimeException("Invalid or expired token");
        }
    }

    private String hashPassword(String pas) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(pas.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b: hash)
                hex.append(String.format("%02x", b));
            return hex.toString();
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
    private String generateJwt(String nickname) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
                .subject(nickname)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }
}
