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
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import sl.qr.mh.service.databaseService;

@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
public class joinPageController {
	
	// DB service
		private final databaseService databaseService;
		// bcrypt
		private BCryptPasswordEncoder bcrypt;

		public joinPageController(
				databaseService databaseService,
				BCryptPasswordEncoder bcrypt) {
			this.databaseService = databaseService;
			this.bcrypt = bcrypt;
		}
		
		/**
		 * @brief 회원가입 페이지 이동
		 * @details 회원가입 페이지로 이동한다.
		 * @param session 사용자 정보를 담은 세션 객체
		 * @param request SERVLET REQUEST
		 * @return String
		 */
		@GetMapping("/sl/user/join")
		public String userJoin(
				HttpSession session,
				HttpServletRequest request) {
			//log.info("userJoin! get");
			return "/join";
		}
		
		/**
		 * @brief 로그인 페이지 이동
		 * @details 회원가입 후 로그인 페이지로 이동한다.
		 * @param session  사용자 정보를 담은 세션 객체
		 * @param request  SERVLET REQUEST
		 * @param userInfo 사용자 정보가 담긴 맵 객체
		 * @return String
		 */
		@PostMapping("/sl/user/join")
		public String userJoin(
				HttpSession session,
				HttpServletRequest request,
				HttpServletResponse response,
				@RequestParam Map<String, String> userInfo) {
			//log.info("userJoin! post");

			String url = "/sl/qr/systempage";
			List<HashMap<String, String>> searchUser = databaseService.searchUser((String) userInfo.get("userId"));

			if (searchUser.size() == 1) {
				session.setAttribute("joinChk", "no");
				session.setAttribute("message", "이미 등록된 사용자입니다.");
			} else {
				String userInfoPassword = (String) userInfo.get("userPassword");
				String userPasswordBcrypt = bcrypt.encode(userInfoPassword);

				userInfo.put("userPassword", userPasswordBcrypt);
				databaseService.insertUser(userInfo);

				session.setAttribute("joinChk", "ok");
				session.setAttribute("message", "joinok");

				url = "redirect:/sl/qr/systempage";
			}

			return "new/usrlist";
		}

}
