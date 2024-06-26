
package sl.qr.mh.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class databaseService {
	
	// DB mapper
		private final databaseMapper databaseMapper;

		public databaseService(databaseMapper databaseMapper) {
			this.databaseMapper = databaseMapper;
		}
		
		/**
		 * @brief [로그] 등록
		 * @details 사용자가 시스템 사용 시 로그를 등록한다.
		 * @param logInfo request, session, QR일련번호를 가짐
		 * @return void
		 */
		public void insertLogQR(Map<String, Object> logInfo) {
			//log.info(">>> dbService... insertQRLog insert<<<");
			databaseMapper.insertLogParamQR(logInfo);
			//log.info(">>> fin <<<");
		};

		/**
		 * @brief [시스템] 시스템 로그 조회
		 * @details 시스템 사용 로그를 조회한다.
		 * @return List > id, ip, times, QR일련번호 반환
		 */
		public List<HashMap<String, String>> systemLogSearch() {
			List<HashMap<String, String>> systemLogParam = databaseMapper.systemLogParam();

			return systemLogParam;
		}

		/**
		 * @brief [시스템] 사용자 정보 조회
		 * @details 시스템에 등록된 사용자 정보를 조회한다.
		 * @param userId 사용자 id (systemUserInfo일 경우 모든 사용자 조회)
		 * @return List > id, name, email, phone, auth
		 */
		public List<HashMap<String, String>> systemUserSearch(String userId) {
			//log.info(">>> dbService... systemUserSearch select<<<");
			List<HashMap<String, String>> systemUserParam = databaseMapper.systemUserParam(userId);
			//log.info(">>> fin <<<");

			return systemUserParam;
		}

		
		/**
		 * @brief [로그인 & 회원가입] 사용자 정보 조회
		 * @details 사용자 로그인 & 회원가입시 사용자가 시스템에 등록되어 있는지 확인
		 * @param userId 데이터베이스에 등록된 사용자 id
		 * @return List > idx, password, id, name, email, phone, auth
		 */
		public List<HashMap<String, String>> searchUser(String userId) {
			//log.info(">>> dbService... searchUser select<<<");
			List<HashMap<String, String>> searchUserParam = databaseMapper.searchUserParam(userId);
			//log.info(">>> fin <<<");

			return searchUserParam;
		}
		
		/**
		 * @brief [로그인 & 회원가입] 사용자 정보 추가
		 * @details 사용자 회원가입 시 시스템에 사용자 정보 추가
		 * @param userInfo id, password, name, email, phone, auth를 가짐
		 * @return void
		 */
		public void insertUser(Map<String, String> userInfo) {
			//log.info(">>> dbService... insertUser insert<<<");
			databaseMapper.insertUserParam(userInfo);
			//log.info(">>> fin <<<");
		}

		/**
		 * @brief [QR] QR 정보 검색
		 * @details 검색조건을 통해 데이터베이스에 등록되어 있는 QR 정보 조회
		 * @param info sRackNumber, sRackLocation, sServerName,
		 *             sPortNumber, eRackNumber, eRackLocation,
		 *             eServerName, ePortNumber, auth를 가짐
		 * @return List >
		 *         idx, sRackNumber, sRackLocation, sServerName, sPortNumber,
		 *         eRackNumber, eRackLocation, eServerName, ePortNumber,
		 *         qrStart, qrEnd, qrStartImage, qrEndImage,
		 *         auth, request
		 */
		public List<HashMap<String, Object>> searchQR2(Map<String, String> info) {
			//log.info(">>> dbService... searchQR search <<<");
			List<HashMap<String, Object>> searchQRAllParam = databaseMapper.searchQRAllParam2(info);
			//log.info(">>> fin <<<");

			return searchQRAllParam;
		}

		/**
		 * @brief [QR] QR 정보 조회
		 * @details 데이터베이스에 등록되어 있는 QR 정보 조회
		 * @param auth 사용자 권한
		 * @return List >
		 *         idx, sRackNumber, sRackLocation, sServerName, sPortNumber,
		 *         eRackNumber, eRackLocation, eServerName, ePortNumber,
		 *         qrStart, qrEnd, qrStartImage, qrEndImage,
		 *         auth, request
		 */
		public List<HashMap<String, Object>> searchQR(String auth) {
		
			List<HashMap<String, Object>> searchQRAllParam = databaseMapper.searchQRAllParam(auth);
		

			return searchQRAllParam;
		}
		
		
		/**
		 * @brief [QR] QR 정보 추가
		 * @details QR 정보 추가 시 시스템에 QR 정보 추가
		 * @param qrMap sRackNumber, sRackLocation, sServerName,
		 *              sPortNumber, eRackNumber, eRackLocation, eServerName,
		 *              ePortNumber, qrStart, qrEnd, qrStartImage, qrEndImage,
		 *              auth, request를 가짐
		 * @return void
		 */
		public void insertQR(Map<String, String> qrMap) {
			//log.info(">>> dbService... insertQR insert<<<");
			databaseMapper.insertQRParam(qrMap);
			//log.info(">>> fin <<<");
		}

		/**
		 * @brief [QR] QR 삭제
		 * @details 사용자가 제거 요청한 QR 데이터를 삭제
		 * @param idx 데이터베이스에 등록된 QR의 idx
		 * @return void
		 */
		public void deleteQR(String idx) {
			//log.info(">>> dbService... systemDeleteQR delete <<<");
			databaseMapper.deleteQRParam(idx);
			//log.info(">>> fin <<<");
		}

		/**
		 * @brief [QR] QR 변경
		 * @details 사용자가 변경 요청한 QR 데이터를 변경
		 * @param qrMap 변경 요청한 QR정보
		 * @return void
		 */
		public void updateQR(Map<String, String> qrMap) {
			//log.info(">>> dbService... systemDeleteQR delete <<<");
			databaseMapper.updateQRParam(qrMap);
			//log.info(">>> fin <<<");
		}
		

}