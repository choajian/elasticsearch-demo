package com.cj.sybaseindex;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * elasticsearch-6.3.2操作
 * @author 晁建
 * @date 2019-05-26
 */
@SpringBootApplication
@MapperScan("com.cj.sybaseindex.sybase.mapper")
public class SpringBootSybaseApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootSybaseApplication.class);
    }
}
