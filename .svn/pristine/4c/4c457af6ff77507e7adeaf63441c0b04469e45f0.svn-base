package com.wzlue.chain;

import com.wzlue.chain.web.common.datasources.DynamicDataSourceConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;

import java.io.IOException;


@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
@Import({DynamicDataSourceConfig.class})
public class WzlueApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(WzlueApplication.class, args);
//		init();
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(WzlueApplication.class);
	}


	public static void init(){
		/*启动谷歌浏览器*/
		try {
			ProcessBuilder proc = new ProcessBuilder( "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
                    "127.0.0.1:8080/chain");
			proc.start();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
