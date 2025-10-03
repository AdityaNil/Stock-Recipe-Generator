package com.spring.SpringAI.controller;
import com.spring.SpringAI.Model.User;
import com.spring.SpringAI.Repository.UserRepository;
import com.spring.SpringAI.Security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        if (repo.existsByUsername(user.getUsername())) {
            return Map.of("error", "Username already exists");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        String token = jwtUtil.generateToken(user.getUsername());
        return Map.of("token", token, "username", user.getUsername(),"name",user.getName());
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        User dbUser = repo.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username"));
        if (!encoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        String token = jwtUtil.generateToken(dbUser.getUsername());
        return Map.of(
                "token", token,
                "username", dbUser.getUsername(),
                "name", dbUser.getName() // <-- include full name
        );
    }
}
