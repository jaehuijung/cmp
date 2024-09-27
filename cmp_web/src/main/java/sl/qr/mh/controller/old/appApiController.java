package sl.qr.mh.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.service.old.databaseService;
import sl.qr.mh.service.logService;

/**
 * @brief 앱 관리 API 컨트롤러
 * @details 앱 관리 전반에 대한 API 컨트롤러를 관리
 * @author 구명회
 * @date 2023.06.21
 * @version 1.0
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@RestController
public class appApiController {

	// DB service
	private final databaseService databaseService;
	// bcrypt
	private BCryptPasswordEncoder bcrypt;
	// log
	private logService logService;

	public appApiController(
			databaseService databaseService,
			BCryptPasswordEncoder bcrypt,
			logService logService) {
		this.databaseService = databaseService;
		this.bcrypt = bcrypt;
		this.logService = logService;
	}

	/**
	 * @brief QR 조회
	 * @details 시스템에서 요청한 QR 리스트를 엑셀로 다운로드
	 * @param session 사용자 정보를 담은 세션 객체
	 * @param request SERVLET REQUEST
	 * @param qrInfo  QR 일련번호가 담긴 맵 객체
	 * @return Map
	 */
	@PostMapping("/sl/appapi/qrsearch")
	public Map<String, String> qrSearchLog(
			HttpSession session,
			HttpServletRequest request,
			@RequestParam Map<String, String> qrInfo) {
		logService.makeUseLog(request, session, qrInfo);

		return qrInfo; // 안드로이드 개발자 요청
	}

	/**
	 * @brief 사용자 로그인
	 * @details 앱에서 받은 로그인 요청을 처리
	 * @param session  사용자 정보를 담은 세션 객체
	 * @param request  SERVLET REQUEST
	 * @param userInfo 사용자 정보가 담긴 맵 객체
	 * @return Map
	 */
	// 세션과 맵 객체 로직이 중복되는데...
	// 이후 맵 객체를 vo 객체로 변경할 때 안드로이드랑 맞추고 중복되는 로직 걷어내야함
	@PostMapping("/sl/appapi/login")
	public Map<String, String> userLogin(
			HttpSession session,
			HttpServlet request,
			@RequestParam Map<String, String> userInfo) {
		// log.info("userLogin! post");

		List<HashMap<String, String>> searchUser = databaseService.searchUser(userInfo.get("userId"));
		Map<String, String> returnUserInfo = new HashMap<String, String>();

		if (searchUser.size() == 0) {
			returnUserInfo.put("loginChk", "no");
			returnUserInfo.put("message", "등록되지 않은 아이디입니다.");
		} else {
			String inputPassword = userInfo.get("userPassword");
			String userDatabasePassword = searchUser.get(0).get("password");

			if (bcrypt.matches(inputPassword, userDatabasePassword)) {
				returnUserInfo.put("id", searchUser.get(0).get("id"));
				returnUserInfo.put("name", searchUser.get(0).get("name"));
				returnUserInfo.put("email", searchUser.get(0).get("email"));
				returnUserInfo.put("phone", searchUser.get(0).get("phone"));
				returnUserInfo.put("loginChk", "ok");
				returnUserInfo.put("message", "loginok");

				return returnUserInfo;
			} else {
				returnUserInfo.put("loginChk", "no");
				returnUserInfo.put("message", "비밀번호가 다릅니다.");
			}
		}

		return returnUserInfo;
	}

}
