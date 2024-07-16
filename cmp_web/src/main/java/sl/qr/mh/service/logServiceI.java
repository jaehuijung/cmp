package sl.qr.mh.service;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

/**
 * @brief 로그 인터페이스 클래스
 * @details 로그 인터페이스 클래스
 * @author 구명회
 * @date 2023.06.21
 * @version 1.0
 */
public interface logServiceI {
        /**
         * @brief 로그 생성
         * @details 사용자의 시스템 사용 로그 저장
         * @param session 사용자 정보를 담은 세션 객체
         * @param request SERVLET REQUEST
         * @param qrInfo  앱에서 리더 한 qr 일련번호
         * @return void
         */
        public abstract void makeUseLog(
                        HttpServletRequest request,
                        HttpSession session,
                        Map<String, String> qrInfo);
}
