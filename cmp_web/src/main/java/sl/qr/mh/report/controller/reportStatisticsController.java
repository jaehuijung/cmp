package sl.qr.mh.report.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 보고서 > 회선통계
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/report/statistics")
public class reportStatisticsController {

    /**
     * 보고서 > 회선통계 > 조회 > 뷰 페이지
     *
     * @return 회선통계 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/report/statistics/view";
    }
}
