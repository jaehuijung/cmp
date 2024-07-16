package sl.qr.mh;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@MapperScan
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class CmpWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmpWebApplication.class, args);
	}

}