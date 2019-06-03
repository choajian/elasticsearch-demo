package com.cj.mongoindex.elasticsearch.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

/**
 * 初始请求
 */
@Controller
public class WebcomeController {

    @GetMapping("/")
    public String welcome(Map<String, Object> model) {
         return "index";
    }
}
