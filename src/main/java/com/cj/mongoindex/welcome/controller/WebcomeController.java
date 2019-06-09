package com.cj.mongoindex.welcome.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

/**
 * @program: elasticsearch-demo
 * @description: 初始请求
 * @author: 晁建
 * @create: 2019-06-07 23:04
 */
@Controller
public class WebcomeController {

    @GetMapping("/")
    public String welcome(Map<String, Object> model) {
         return "index";
    }
}
