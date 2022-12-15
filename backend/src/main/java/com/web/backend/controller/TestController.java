package com.web.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(path = "/api/v1/test")
public class TestController {

    @GetMapping("/public")
    public String publicAccess(){
        return "public";
    }

    @GetMapping("/authorized")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String authorizedAccess(){
        return "authorized";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess(){
        return "admin";
    }
}
