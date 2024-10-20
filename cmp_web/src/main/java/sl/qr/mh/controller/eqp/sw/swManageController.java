package sl.qr.mh.controller.eqp.sw;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.eqp.sw.swManageService;

import java.io.IOException;
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
     * S/W관리 > 장비목록 > 추가 뷰 페이지
     *
     * @return 장비 추가 뷰 페이지
     */
    @GetMapping("/create")
    public String createEquipmentPage() {
        return "views/eqp/sw/register";
    }

    /**
     * S/W관리 > 장비목록 > 추가 > 장비 정보 저장
     *
     * @return 장비 저장 결과
     */
    @ResponseBody
    @PostMapping("/saveEquipmentInfo")
    public Map<String, Object> saveEquipmentInfo(@RequestBody Map<String, Object> paramMap) {
        return swManageService.insertEqpList(paramMap);
    }



    /**
     * S/W관리 > 장비목록 > 상세 뷰 페이지
     *
     * @return 장비 상세 뷰 페이지
     */
    @GetMapping("/detail/{id}")
    public String detailEquipmentPage(@PathVariable("id") String eqp_manage_id, Model model) {
        Map<String, Object> result = swManageService.getEquipmentDetailTotalList(eqp_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("equipment", result.get("selectData"));
            return "views/eqp/sw/detail";
        }
        else{
            return "views/error/error";
        }
    }

    /**
     * S/W관리 > 장비목록 > 수정 뷰 페이지
     *
     * @return 장비 수정 뷰 페이지
     */
    @GetMapping("/update/{id}")
    public String updateEquipmentPage(@PathVariable("id") String eqp_manage_id, Model model) {
        Map<String, Object> result = swManageService.getEquipmentUpdateTotalList(eqp_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("equipment",       result.get("selectData"));
            model.addAttribute("config_category", result.get("config_category"));
            model.addAttribute("asset_category",  result.get("asset_category"));
            model.addAttribute("sub_category",    result.get("sub_category"));
            model.addAttribute("detail_category", result.get("detail_category"));

            return "views/eqp/sw/update";
        }
        else{
            return "views/error/error";
        }
    }

    /**
     * S/W관리 > 장비목록 > 수정 > 장비 정보 수정
     *
     * @return 장비 수정 결과
     */
    @ResponseBody
    @PostMapping("/updateEquipmentInfo")
    public Map<String, Object> updateEquipmentInfo(@RequestBody Map<String, Object> paramMap) {
        return swManageService.updateEqpList(paramMap);
    }




}
