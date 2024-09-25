package sl.qr.mh.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import sl.qr.mh.service.databaseService;

@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@RestController
public class systemManageApiController {
	// DB service
		private final databaseService databaseService;

		public systemManageApiController(
				databaseService databaseService) {
			this.databaseService = databaseService;
		}

		/**
		 * @brief 시스템 로그 조회
		 * @details 시스템 사용 로그를 조회한다.
		 * @param session 사용자 정보를 담은 세션 객체
		 * @param request SERVLET REQUEST
		 * @return List > id, ip, times, api, details를 반환
		 */
		@GetMapping(value = "/api/system/searchlog")
		public List<HashMap<String, String>> searchLog(
				HttpSession session,
				HttpServletRequest request) {
			//log.info("qr search!");
			List<HashMap<String, String>> searchLogAllParam = databaseService.systemLogSearch();

			return searchLogAllParam;
		}

		/**
		 * @brief 사용자 정보 조회
		 * @details 시스템에 등록된 사용자 정보를 조회한다.
		 * @param session 사용자 정보를 담은 세션 객체
		 * @param request SERVLET REQUEST
		 * @return List > id, name, email, phone, auth
		 */
		@GetMapping(value = "/api/system/alluser")
		public List<HashMap<String, String>> systemPage(
				HttpSession session,
				HttpServletRequest request) throws Exception {
			//log.info("systemPage!");
			List<HashMap<String, String>> systemUser = databaseService.systemUserSearch("systemUserInfo");

			return systemUser;
		}

}
