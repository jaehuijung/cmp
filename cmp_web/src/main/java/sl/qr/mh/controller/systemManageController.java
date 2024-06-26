package sl.qr.mh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
public class systemManageController {
	public systemManageController() {
	}

	/**
	 * @brief 시스템 페이지 이동
	 * @details 시스템 페이지로 이동한다.
	 * @param session 사용자 정보를 담은 세션 객체
	 * @param request SERVLET REQUEST
	 * @return String
	 */
	@PostMapping(value = "/sl/qr/systempage")
	public String systemPage(
			HttpSession session,
			HttpServletRequest request) throws Exception {
		
		return "/system";
	}

}
