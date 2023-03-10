package com.web.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {

    @GetMapping(path = {"", "/home", "/register", "/login", "/welcome",})
    public String home() {
        return "forward:/index.html";
    }
}