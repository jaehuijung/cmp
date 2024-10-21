package sl.qr.mh.controller.network.portmap;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sl.qr.mh.service.main.dashboard.portmapManageService;

/**
 * 네트워크 > 포트맵
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/network/portmap")
public class portmapController {
    private final portmapManageService portmapManageService;

    public portmapController(portmapManageService portmapManageService){
        this.portmapManageService = portmapManageService;
    }

    /**
     * 네트워크 > 포트맵 > 조회 > 뷰 페이지
     *
     * @return 포트맵 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/network/portmap/view";
    }
}
