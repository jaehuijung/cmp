package sl.qr.mh.controller.common;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
public class loginController {

	// bcrypt
	private BCryptPasswordEncoder bcrypt;

	public loginController(
			BCryptPasswordEncoder bcrypt) {
		this.bcrypt = bcrypt;
	}

	/**
	 * @brief 로그인 페이지 이동
	 * @details 로그인 페이지로 이동한다.
	 * @return String
	 */
	@GetMapping("/login")
	public String userLogin() {

		return "views/login";
	}

	/**
	 * @brief 로그인 페이지 이동
	 * @details 로그아웃 후 로그인 페이지로 이동한다.
	 * @return String
	 */
	@PostMapping("/logout")
	public String userLogout() {

		return "redirect:/login";
	}
}
