package sl.qr.mh.cable.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 선번장관리 > 기관회선관리
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/cable/agency")
public class agencyController {

    /**
     * 신청관리 > 포설신청 > 조회 > 뷰 페이지
     *
     * @return 포설신청 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/cable/agencyLine/view";
    }
}
