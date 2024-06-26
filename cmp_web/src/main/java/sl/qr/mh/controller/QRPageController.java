package sl.qr.mh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class QRPageController {
	
	

	@GetMapping("/sl/qr/showqr")
    public String showQR(
            HttpSession session,
            HttpServletRequest request) {
        
        return "showQR";
    }

    /**
     * @brief QR 등록 페이지 이동
     * @details QR 등록 페이지로 이동한다.
     * @param session 사용자 정보를 담은 세션 객체
     * @param request SERVLET REQUEST
     * @return String
     */
    @GetMapping(value = "/sl/qr/insert")
    public String insertQR(
            HttpSession session,
            HttpServletRequest request) throws Exception {
    
        return "/make";
    }
    
    /**
     * @brief QR 조회 페이지 이동
     * @details QR 조회 페이지로 이동한다.
     * @param session 사용자 정보를 담은 세션 객체
     * @param request SERVLET REQUEST
     * @return String
     */
    @GetMapping("/sl/qr/qrAddModal")
    public String qrAddModal(
            HttpSession session,
            HttpServletRequest request) {
    	
 
        return "qrAddModal";
    }
    
    @GetMapping("/sl/qr/userAddModal")
    public String userModal(
            HttpSession session,
            HttpServletRequest request) {
     
        return "userModal";
    }
    
    
   

}
