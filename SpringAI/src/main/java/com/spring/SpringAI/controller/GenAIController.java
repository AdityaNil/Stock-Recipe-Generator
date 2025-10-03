package com.spring.SpringAI.controller;

import com.spring.SpringAI.Service.ChatService;
import com.spring.SpringAI.Service.EmailService;
import com.spring.SpringAI.Service.ImageService;
import com.spring.SpringAI.Service.RecipeService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class GenAIController {
    @Autowired
    private ChatService chatService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private RecipeService recipeService;
    @Autowired
    private EmailService emailService;

    @GetMapping("/ask")
    public String getResponse(@RequestParam String prompt){
        return chatService.getResponse(prompt);
    }

    @GetMapping("/generate_image")
    public List<String> generateImage(HttpServletResponse response,
                                      @RequestParam String prompt,
                                      @RequestParam(defaultValue = "hd") String quality,
                                      @RequestParam(defaultValue = "1")int n,
                                      @RequestParam(defaultValue = "1024")int width,
                                      @RequestParam(defaultValue = "1024")int height) throws IOException{
        ImageResponse imageResponse = imageService.generateImage(prompt,quality,n,width,height);
        List<String> imageUrls = imageResponse.getResults().stream().map(result->result.getOutput().getUrl()).toList();
        return imageUrls;
    }
    String ing,sendR;
    @GetMapping("/recipe")
    public String recipeCreator(@RequestParam String ingredients,
                                @RequestParam(defaultValue = "any")String cuisine,
                                @RequestParam(defaultValue = "")String restrictions){
        ing=ingredients;
        sendR = recipeService.createRecipe(ingredients,cuisine,restrictions);
        return sendR;
    }
    @GetMapping("/send")
    public void sendMail(@RequestParam String prompt)
    {
        emailService.sendEmail(prompt,ing,sendR);
    }
}
