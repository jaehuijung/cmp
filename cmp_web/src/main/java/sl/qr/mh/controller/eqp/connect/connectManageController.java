package sl.qr.mh.controller.eqp.connect;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *  장비관리 > 연결정보 관리
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/eqp/connect")
public class connectManageController {


    public connectManageController() {
    }

    /**
     * 연결정보 관리 > 장비목록 > 조회 뷰 페이지
     *
     * @return 장비 목록 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/eqp/connect/view";
    }
}
