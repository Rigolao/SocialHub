package br.socialhub.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SocialhubApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocialhubApplication.class, args);
	}

}
