package sl.qr.mh.controller.main.statistics;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sl.qr.mh.service.main.statistics.statisticsManageService;

/**
 * 메인 > 보고/통계
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/main/statistics")
public class statisticsController {

    private final statisticsManageService statisticsManageService;

    public statisticsController(statisticsManageService statisticsManageService){
        this.statisticsManageService = statisticsManageService;
    }

    /**
     * 메인 > 보고/통계 > 조회 > 뷰 페이지
     *
     * @return 보고/통계 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/main/notice/view";
    }

}
