package sl.qr.mh.controller.rack.line;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.rack.rackManageService;

import java.util.List;
import java.util.Map;

/**
 * 선번장관리 > 선번장관리
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping(value = "/rack/line")
public class rackManageController {

    private final rackManageService rackManageService;

    public rackManageController(rackManageService rackManageService) {
        this.rackManageService = rackManageService;
    }

    /**
     * 선번장관리 > 선번장목록
     * 
     * @return 선번장 목록 뷰 페이지
     */
    @GetMapping("/view")
    public String view(Authentication authentication) {
        return "views/rack/line/view";
    }
    
    /**
     * 선번장관리 > 선번장목록 > 선번장 목록 데이터
     *
     * @param paramMap 요청 파라미터 맵
     * @return 선번장 목록 데이터 및 기타 메타 정보
     */
    @PostMapping("/list")
    @ResponseBody
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return rackManageService.getRackList(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 추가
     *
     * @return 선번장 추가 뷰 페이지
     */
    @GetMapping("/create")
    public String createRackPage() {
        return "views/rack/line/register";
    }

    /**
     * 선번장관리 > 선번장목록 > 추가/수정 > 출발지, 목적지 장비 리스트
     *
     * @return 장비 리스트
     */
    @ResponseBody
    @PostMapping("/rackEquipmentList")
    public Map<String, Object> getRackEquipmentList(@RequestBody Map<String, Object> paramMap) {
        return rackManageService.getRackEquipmentList(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 추가 / 수정 > 회선정보 리스트
     *
     * @return 회선정보 리스트
     */
    @ResponseBody
    @PostMapping("/selectLink")
    public Map<String, Object> getRackLinkList() {
        return rackManageService.getRackLinkList();
    }

    /**
     * 선번장관리 > 선번장목록 > 추가
     * 선번장 정보 저장
     *
     * @return 선번장 저장 결과
     */
    @ResponseBody
    @PostMapping("/saveRackInfo")
    public Map<String, Object> saveRackInfo(@RequestBody Map<String, Object> paramMap) {
         return rackManageService.saveRackInfo(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 상세
     *
     * @return 선번장 상세 뷰 페이지
     */
    @GetMapping("/detail/{id}")
    public String detailRackPage(@PathVariable("id") String cable_manage_id, Model model) {
        Map<String, Object> result = rackManageService.getEquipmentDetailTotalList(cable_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("cable", result.get("selectData"));
            return "views/rack/line/detail";
        }
        else{
            return "views/error/error";
        }
    }

    /**
     * 선번장관리 > 선번장목록 > 수정/상세 > 선택된 선번장 구성 데이터 (출발지, 목적지)
     * 
     * @return 선번장 구성 데이터
     */
    @ResponseBody
    @PostMapping("/getRackDetailInfo")
    public Map<String, Object> getRackDetailInfo(@RequestBody Map<String, Object> paramMap) {
        return rackManageService.getRackDetailInfo(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 수정
     *
     * @return 선번장 수정 뷰 페이지
     */
    @GetMapping("/update/{id}")
    public String updateRackPage(@PathVariable("id") String cable_manage_id, Model model) {
        Map<String, Object> result = rackManageService.getEquipmentUpdateTotalList(cable_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("cable", result.get("selectData"));
            model.addAttribute("link_category", result.get("link_category"));
            model.addAttribute("link_speed",    result.get("link_speed"));
            model.addAttribute("link_color",    result.get("link_color"));

            return "views/rack/line/update";
        }
        else{
            return "views/error/error";
        }
    }

    /**
     * 선번장관리 > 선번장목록 > 선번장 목록 삭제
     *
     * @param deleteList 삭제할 장비 목록
     * @return 삭제 결과
     */
    @ResponseBody
    @PostMapping("/delete")
    public Map<String, Object> delete(@RequestBody List<Map<String, Object>> deleteList) {
        return rackManageService.deleteRackList(deleteList);
    }
}
