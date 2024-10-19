package sl.qr.mh.controller.eqp.sw;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.eqp.sw.swManageService;

import java.util.Map;

/**
 * 장비관리 > S/W관리
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/eqp/sw")
public class swManageController {

    private final swManageService swManageService;

    public swManageController(swManageService swManageService){
        this.swManageService = swManageService;
    }

    /**
     * S/W관리 > 장비목록 > 조회
     *
     * @return  목록 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/eqp/sw/view";
    }

    /**
     * S/W관리 > 장비목록 > 장비목록 데이터
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터 및 기타 메타 정보
     */
    @ResponseBody
    @PostMapping("/list")
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return swManageService.getEquipmentTotalList(paramMap);
    }

    /**
     * H/W관리 > 장비목록 > 추가 뷰 페이지
     *
     * @return 장비 추가 뷰 페이지
     */
    @GetMapping("/create")
    public String createEquipmentPage() {
        return "views/eqp/sw/register";
    }
}
