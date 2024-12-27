package sl.qr.mh.operation.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 운영관리 > 계정그룹
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/operation/group")
public class groupController {

    /**
     * 운영관리 > 계정그룹 > 조회 > 뷰 페이지
     *
     * @return 계정그룹 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/operation/group/view";
    }
}
