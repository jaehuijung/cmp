package sl.qr.mh.controller.cable;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.cable.cableManageService;
import sl.qr.mh.vo.Cable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping(value = "/cable/rack")
public class cableManageController {

    private final cableManageService cableManageService;

    public cableManageController(cableManageService cableManageService) {
        this.cableManageService = cableManageService;
    }

    /**
     * 선번장관리 > 선번장목록
     * 
     * @return 선번장 목록 뷰 페이지
     */
    @GetMapping("/view")
    public String view(Authentication authentication) {
        return "views/cable/view";
    }
    
    /**
     * 선번장관리 > 선번장목록
     * 선번장 목록 데이터 
     *
     * @param paramMap 요청 파라미터 맵
     * @return 선번장 목록 데이터 및 기타 메타 정보
     */
    @PostMapping("/list")
    @ResponseBody
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return cableManageService.getCableList(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 추가
     *
     * @return 선번장 추가 뷰 페이지
     */
    @GetMapping("/create")
    public String register() {
        return "views/cable/register2";
    }

    /**
     * 선번장관리 > 선번장목록 > 추가
     *
     * @return 선번장 추가 뷰 페이지
     */
    @ResponseBody
    @PostMapping("/rackEquipmentList")
    public Map<String, Object> rackEquipmentList(Map<String, Object> paramMap) {
        return cableManageService.getRackEquipmentList(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 추가
     * 선번장 정보 저장
     *
     * @return 선번장 저장 결과
     */
    @PostMapping("/insert")
    public String insert(Cable vo, HttpServletRequest request) {
        // cableservice.insertCable(vo);

        return "views/cable/view";
    }


}