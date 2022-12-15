package com.web.backend.controller;

import com.web.backend.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserDetailsServiceImpl userService;

    @GetMapping("/user")
    public ResponseEntity<?> getOneUser(@RequestParam String username){
        try {
            return ResponseEntity.ok(userService.loadUserByUsername(username));
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Error");
        }
    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteUser(@PathVariable String id){
//        try {
//            return ResponseEntity.ok(userService.delete(id));
//        } catch (Exception e){
//            return ResponseEntity.badRequest().body("Error");
//        }
//    }
}
