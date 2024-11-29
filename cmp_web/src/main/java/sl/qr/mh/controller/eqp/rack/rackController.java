package sl.qr.mh.controller.eqp.rack;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *  장비관리 > 랙 실장도
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/eqp/rack")
public class rackController {


    public rackController() {
    }

    /**
     * 연결정보 관리 > 랙 실장도
     *
     * @return 랙 실장도 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/eqp/rack/view";
    }
}
