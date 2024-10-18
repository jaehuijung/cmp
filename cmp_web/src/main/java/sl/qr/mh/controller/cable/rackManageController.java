package sl.qr.mh.controller.cable;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.cable.cableManageService;

import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping(value = "/rack")
public class rackManageController {

    private final cableManageService cableManageService;

    public rackManageController(cableManageService cableManageService) {
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
     * 선번장관리 > 선번장목록 > 선번장 목록 데이터
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
    public String createCablePage() {
        return "views/cable/register";
    }

    /**
     * 선번장관리 > 선번장목록 > 추가/수정 > 출발지, 목적지 장비 리스트
     *
     * @return 장비 리스트
     */
    @ResponseBody
    @PostMapping("/rackEquipmentList")
    public Map<String, Object> getRackEquipmentList(@RequestBody Map<String, Object> paramMap) {
        return cableManageService.getRackEquipmentList(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 추가 / 수정 > 회선정보 리스트
     *
     * @return 회선정보 리스트
     */
    @ResponseBody
    @PostMapping("/selectLink")
    public Map<String, Object> getRackLinkList() {
        return cableManageService.getRackLinkList();
    }

    /**
     * 선번장관리 > 선번장목록 > 추가
     * 선번장 정보 저장
     *
     * @return 선번장 저장 결과
     */
    @ResponseBody
    @PostMapping("/saveCableInfo")
    public Map<String, Object> saveCableInfo(@RequestBody Map<String, Object> paramMap) {
         return cableManageService.saveCableInfo(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 상세
     *
     * @return 선번장 상세 뷰 페이지
     */
    @GetMapping("/detail/{id}")
    public String detailCablePage(@PathVariable("id") String cable_manage_id, Model model) {
        Map<String, Object> result = cableManageService.getEquipmentDetailTotalList(cable_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("cable", result.get("selectData"));
            return "views/cable/detail";
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
    @PostMapping("/getCableDetailInfo")
    public Map<String, Object> getCableDetailInfo(@RequestBody Map<String, Object> paramMap) {
        return cableManageService.getCableDetailInfo(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 수정
     *
     * @return 선번장 수정 뷰 페이지
     */
    @GetMapping("/update/{id}")
    public String updateCablePage(@PathVariable("id") String cable_manage_id, Model model) {
        Map<String, Object> result = cableManageService.getEquipmentUpdateTotalList(cable_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("cable", result.get("selectData"));
            model.addAttribute("link_category", result.get("link_category"));
            model.addAttribute("link_speed",    result.get("link_speed"));
            model.addAttribute("link_color",    result.get("link_color"));

            return "views/cable/update";
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
        return cableManageService.deleteCableList(deleteList);
    }
}
