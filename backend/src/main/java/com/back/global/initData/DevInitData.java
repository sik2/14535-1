package com.back.global.initData;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("dev")
@RequiredArgsConstructor
@Configuration
public class DevInitData {

    @Bean
    ApplicationRunner devInitDataApplicationRunner() {
        return args ->
                System.out.println("devInitDataApplicationRunner 실행");
    }
}
