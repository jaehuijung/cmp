package sl.qr.mh.report.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 보고서 > 통신패치현황
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/report/patchstatus")
public class patchStatusController {

    /**
     * 보고서 > 통신패치현황 > 조회 > 뷰 페이지
     *
     * @return 통신패치현황 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/report/patchStatus/view";
    }
}
