package sl.qr.mh.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

/**
 * @brief 로그 서비스 클래스
 * @details 모든 페이지에서 호출되는 로그 요청을 처리
 * @author 구명회
 * @date 2023.06.21
 * @version 1.0
 */
@Slf4j
@Service
public class logService implements logServiceI {

    // DB mapper
    private final databaseService databaseService;

    public logService(databaseService databaseService) {
        this.databaseService = databaseService;
    }

    /**
     * @brief 로그 생성
     * @details 사용자의 시스템 사용 로그 저장
     * @param session 사용자 정보를 담은 세션 객체
     * @param request SERVLET REQUEST
     * @param qrInfo  앱에서 리더 한 qr 일련번호
     * @return void
     */
    public void makeUseLog(
            HttpServletRequest request,
            HttpSession session,
            Map<String, String> qrInfo) {
        Map<String, Object> returnLog = new HashMap<>();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar calendar = Calendar.getInstance();

        String ip = request.getHeader("X-Forwarded-For");

        if (ip == null) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null) {
            ip = request.getHeader("WL-Proxy-Client-IP"); // 웹로직
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null) {
            ip = request.getRemoteAddr();
        }

        returnLog.put("ip", ip);
        returnLog.put("times", formatter.format(calendar.getTime()));

        returnLog.put("id", qrInfo.get("UserId"));
        returnLog.put("RackNumber", qrInfo.get("RackNumber"));
        returnLog.put("RackLocation", qrInfo.get("RackLocation"));
        returnLog.put("ServerName", qrInfo.get("ServerName"));
        returnLog.put("PortNumber", qrInfo.get("PortNumber"));

        //log.info("returnLog:" + returnLog);

        databaseService.insertLogQR(returnLog);

        //log.info("returnLog:" + returnLog);
    }
}
