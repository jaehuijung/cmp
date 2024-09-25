package sl.qr.mh.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import sl.qr.mh.vo.User;

@Mapper
public interface databaseMapper {
	
	/**
	 * @brief [로그] 등록
	 * @details 사용자가 앱에서 QR 리더 시 로그를 등록한다.
	 * @param logInfo request, session, QR일련번호를 가짐
	 * @return void
	 */
	public void insertLogParamQR(Map<String, Object> logInfo);

	/**
	 * @brief [시스템] 시스템 로그 조회
	 * @details 시스템 사용 로그를 조회한다.
	 * @return List > id, ip, times, QR일련번호 반환
	 */
	public List<HashMap<String, String>> systemLogParam();

	/**
	 * @brief [시스템] 사용자 정보 조회
	 * @details 시스템에 등록된 사용자 정보를 조회한다.
	 * @param userId systemUserInfo일 경우 모든 사용자 조회
	 * @return List > id, name, email, phone, auth
	 */
	public List<HashMap<String, String>> systemUserParam(String userId);
	
	
	/**
	 * @brief [로그인 & 회원가입] 사용자 정보 조회
	 * @details 사용자 로그인 & 회원가입시 사용자가 시스템에 등록되어 있는지 확인
	 * @param userId 데이터베이스에 등록된 사용자 id
	 * @return List > idx, password, id, name, email, phone, auth
	 */
	public List<HashMap<String, String>> searchUserParam(String userId);
	
	/**
	 * @brief [로그인 & 회원가입] 사용자 정보 추가
	 * @details 사용자 회원가입 시 시스템에 사용자 정보 추가
	 * @param userInfo id, password, name, email, phone, auth를 가짐
	 * @return void
	 */
	public void insertUserParam(Map<String, String> userInfo);
	
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
	public List<HashMap<String, Object>> searchQRAllParam2(Map<String, String> info);

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
	public List<HashMap<String, Object>> searchQRAllParam(String auth);

	/**
	 * @brief [QR] QR 정보 추가
	 * @details QR 정보 추가 시 시스템에 QR 정보 추가
	 * @param qrMap sRackNumber, sRackLocation, sServerName,
	 *              sPortNumber, eRackNumber, eRackLocation, eServerName,
	 *              ePortNumber, qrStart, qrEnd, qrStartImage, qrEndImage,
	 *              auth, request를 가짐
	 * @return void
	 */
	public void insertQRParam(Map<String, String> qrMap);

	/**
	 * @brief [QR] QR 삭제
	 * @details 사용자가 제거 요청한 QR 데이터를 삭제
	 * @param idx 데이터베이스에 등록된 QR의 idx
	 * @return void
	 */
	public void deleteQRParam(String idx);

	/**
	 * @brief [QR] QR 변경
	 * @details 사용자가 변경 요청한 QR 데이터를 변경
	 * @param qrMap 변경 요청한 QR정보
	 * @return void
	 */
	public void updateQRParam(Map<String, String> qrMap);

	public User selectUser(User vo);
	public void updateUser(User vo);
	public void deleteUser(User vo);

	
}