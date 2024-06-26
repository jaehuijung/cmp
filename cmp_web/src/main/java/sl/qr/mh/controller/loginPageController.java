package sl.qr.mh.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import sl.qr.mh.service.databaseService;
import sl.qr.mh.vo.Cable;


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
	 * @param session 사용자 정보를 담은 세션 객체
	 * @param request SERVLET REQUEST
	 * @return String
	 */
	@GetMapping("/sl/user/login")
	public String userLogin(
			HttpSession session,
			HttpServletRequest request) {
		

		return "/login";
	}
	
	/**
	 * @brief 로그인 페이지 이동
	 * @details 로그아웃 후 로그인 페이지로 이동한다.
	 * @param session 사용자 정보를 담은 세션 객체
	 * @param request SERVLET REQUEST
	 * @return String
	 */
	@PostMapping("/sl/user/logout")
	public String userLogout(
			HttpSession session,
			HttpServletRequest request) {
		//log.info("userLogout! post");

		session.invalidate();

		return "redirect:/sl/user/login";
	}

	
	
	
	
	/**
	 * @brief 로그인 페이지 이동
	 * @details 로그아웃 후 로그인 페이지로 이동한다.
	 * @param session  사용자 정보를 담은 세션 객체
	 * @param request  SERVLET REQUEST
	 * @param userInfo 사용자 정보가 담긴 맵 객체
	 * @return String
	 */
	@PostMapping("/sl/user/login")
	public String userLogin(
			HttpSession session,
			@RequestParam Map<String, String> userInfo,
			HttpServletRequest request) {
	
		String url = "redirect:/sl/user/login";
		List<HashMap<String, String>> searchUser = databaseService.searchUser((String) userInfo.get("userId"));

		if (searchUser.isEmpty()) {
			session.setAttribute("loginChk", "no");
			session.setAttribute("message", "등록되지 않은 아이디입니다.");
		} else {
			//url = "redirect:/sl/qr/showqr";
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

				//url = "redirect:/sl/qr/showqr";
				url = "redirect:/test";
			} else {
				session.setAttribute("loginChk", "no");
				session.setAttribute("message", "비밀번호가 다릅니다.");
			}
		}

		return url;
	
	}

}
