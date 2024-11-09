package sl.qr.mh.controller.rack.line;


import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.rack.line.lineManageService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 선번장관리 > 선번장관리
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping(value = "/rack/line")
public class lineManageController {

    private final lineManageService lineManageService;

    public lineManageController(lineManageService lineManageService) {
        this.lineManageService = lineManageService;
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
        return lineManageService.getLineList(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 추가
     *
     * @return 선번장 추가 뷰 페이지
     */
    @GetMapping("/create")
    public String createLinePage() {
        return "views/rack/line/register";
    }

    /**
     * 선번장관리 > 선번장목록 > 추가/수정 > 출발지 장비 리스트
     *
     * @return 장비 리스트
     */
    @ResponseBody
    @PostMapping("/startEquipmentList")
    public Map<String, Object> getLineStartEquipmentList(@RequestBody Map<String, Object> paramMap) {
        return lineManageService.getLineStartEquipmentList(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 추가/수정 > 목적지 장비 리스트
     *
     * @return 장비 리스트
     */
    @ResponseBody
    @PostMapping("/endEquipmentList")
    public Map<String, Object> getLineEndEquipmentList(@RequestBody Map<String, Object> paramMap) {
        return lineManageService.getLineEndEquipmentList(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 추가 / 수정 > 회선정보 리스트
     *
     * @return 회선정보 리스트
     */
    @ResponseBody
    @PostMapping("/selectLink")
    public Map<String, Object> getLineLinkList() {
        return lineManageService.getLineLinkList();
    }

    /**
     * 선번장관리 > 선번장목록 > 추가
     * 선번장 정보 저장
     *
     * @return 선번장 저장 결과
     */
    @ResponseBody
    @PostMapping("/saveLineInfo")
    public Map<String, Object> saveLineInfo(@RequestBody Map<String, Object> paramMap) {
         return lineManageService.saveLineInfo(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 상세
     *
     * @return 선번장 상세 뷰 페이지
     */
    @GetMapping("/detail/{id}")
    public String detailLinePage(@PathVariable("id") String line_manage_id, Model model) {
        Map<String, Object> result = lineManageService.getEquipmentDetailTotalList(line_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("line", result.get("selectData"));
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
    @PostMapping("/getLineDetailInfo")
    public Map<String, Object> getLineDetailInfo(@RequestBody Map<String, Object> paramMap) {
        return lineManageService.getLineDetailInfo(paramMap);
    }

    /**
     * 선번장관리 > 선번장목록 > 수정
     *
     * @return 선번장 수정 뷰 페이지
     */
    @GetMapping("/update/{id}")
    public String updateLinePage(@PathVariable("id") String line_manage_id, Model model) {
        Map<String, Object> result = lineManageService.getEquipmentUpdateTotalList(line_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("line", result.get("selectData"));
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
     * 선번장관리 > 선번장목록 > 수정 > 저장
     * 선번장 정보 저장
     *
     * @return 선번장 저장 결과
     */
    @ResponseBody
    @PostMapping("/updateLineInfo")
    public Map<String, Object> updateLineInfo(@RequestBody Map<String, Object> paramMap) {
        return lineManageService.updateLineInfo(paramMap);
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
        return lineManageService.deleteLineList(deleteList);
    }


    /**
     * 선번장관리 > 선번장목록 > PDF
     */
    @PostMapping("/qrLoad")
    public String qrPrint(@RequestBody List<Map<String, Object>> paramMap, Model model) {
        model.addAttribute("selections", paramMap);
        return "views/rack/line/qrLoad";
    }

    /**
     * 선번장관리 > 선번장목록 > 선번장 목록 다운로드
     */
    @ResponseBody
    @PostMapping("/downloadLineInfo")
    public void downloadLineInfo(HttpServletResponse response) throws IOException {

        Workbook wb = lineManageService.downloadLineList();
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=equipmentListTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }

}
