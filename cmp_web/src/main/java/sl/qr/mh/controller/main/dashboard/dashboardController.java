package sl.qr.mh.controller.main.dashboard;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sl.qr.mh.service.main.dashboard.dashboardManageService;

/**
 * 메인 > 대시보드
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/main/dashboard")
public class dashboardController {
    private final dashboardManageService dashboardManageService;

    public dashboardController(dashboardManageService dashboardManageService){
        this.dashboardManageService = dashboardManageService;
    }

    /**
     * 메인 > 대시보드 > 조회 > 뷰 페이지
     *
     * @return 대시보드 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/main/dashboard/view";
    }
}
