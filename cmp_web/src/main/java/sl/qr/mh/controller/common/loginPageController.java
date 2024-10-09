package sl.qr.mh.controller.common;

import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sl.qr.mh.service.old.databaseService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
public class loginPageController {
	
	// DB service
	private final databaseService databaseService;
	// bcrypt
	private BCryptPasswordEncoder bcrypt;

	public loginPageController(
			databaseService databaseService,
			BCryptPasswordEncoder bcrypt) {
		this.databaseService = databaseService;
		this.bcrypt = bcrypt;
	}
	
	
	/**
	 * @brief 로그인 페이지 이동
	 * @details 로그인 페이지로 이동한다.
	 * @return String
	 */
	@GetMapping("/sl/user/login")
	public String userLogin() {
		
		return "views/login";
	}
	
	/**
	 * @brief 로그인 페이지 이동
	 * @details 로그아웃 후 로그인 페이지로 이동한다.
	 * @return String
	 */
	@PostMapping("/sl/user/logout")
	public String userLogout() {

		return "redirect:/sl/user/login";
	}

	/**
	 * @brief 로그인 페이지 이동
	 * @details 로그아웃 후 로그인 페이지로 이동한다.
	 * @param session  사용자 정보를 담은 세션 객체
	 * @param userInfo 사용자 정보가 담긴 맵 객체
	 * @return String
	 */
	@PostMapping("/sl/user/login")
	public String userLogin(
			HttpSession session,
			@RequestParam Map<String, String> userInfo) {
	
		String url = "redirect:/sl/user/login";
		List<HashMap<String, String>> searchUser = databaseService.searchUser((String) userInfo.get("userId"));

		if (searchUser.isEmpty()) {
			session.setAttribute("loginChk", "no");
			session.setAttribute("message", "등록되지 않은 아이디입니다.");
		} else {
			String inputPassword = (String) userInfo.get("userPassword");
			String userDatabasePassword = searchUser.get(0).get("password");

			if (bcrypt.matches(inputPassword, userDatabasePassword)) {
				session.setAttribute("idx", searchUser.get(0).get("idx"));
				session.setAttribute("id", searchUser.get(0).get("id"));
				session.setAttribute("name", searchUser.get(0).get("name"));
				session.setAttribute("email", searchUser.get(0).get("email"));
				session.setAttribute("phone", searchUser.get(0).get("phone"));
				session.setAttribute("loginChk", "ok");
				session.setAttribute("message", "loginok");

				url = "redirect:/cable/rack/view";
			} else {
				session.setAttribute("loginChk", "no");
				session.setAttribute("message", "비밀번호가 다릅니다.");
			}
		}

		return url;
	}
}
