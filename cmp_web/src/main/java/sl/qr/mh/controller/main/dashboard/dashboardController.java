package sl.qr.mh.controller.main.dashboard;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import sl.qr.mh.service.main.dashboard.dashboardManageService;

import java.util.Map;

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

    /**
     * 메인 > 대시보드 > 조회 > 케이블 포설 현황 데이터
     *
     * @return 대시보드 케이블 포설 현황 차트 데이터
     */
    @ResponseBody
    @GetMapping("/cableData")
    public String getCableData() {
        return "views/main/dashboard/view";
    }

    /**
     * 메인 > 대시보드 > 조회 > 케이블 포설 현황 상세 데이터
     *
     * @return 대시보드 케이블 포설 상세 현황 차트 데이터
     */
    @ResponseBody
    @GetMapping("/cableDetailData")
    public Map<String, Object> getCableDetailData() {
        return dashboardManageService.getCableDetailData();
    }

    /**
     * 메인 > 대시보드 > 조회 > 장비 등록 상세 현황 데이터
     *
     * @return 대시보드 장비 등록 상세 현황 차트 데이터
     */
    @ResponseBody
    @GetMapping("/equipmentData")
    public String getEquipmentData() {
        return "views/main/dashboard/view";
    }

    /**
     * 메인 > 대시보드 > 조회 > 소프트웨어 등록 상세 현황 데이터
     *
     * @return 대시보드 소프트웨어 등록 상세 현황 차트 데이터
     */
    @ResponseBody
    @GetMapping("/softwareData")
    public String getSoftwareData() {
        return "views/main/dashboard/view";
    }
}
