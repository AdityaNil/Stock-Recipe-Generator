package com.spring.SpringAI;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Health {

    @GetMapping
    public String check(){
        return "chal rha haii";
    }
}
