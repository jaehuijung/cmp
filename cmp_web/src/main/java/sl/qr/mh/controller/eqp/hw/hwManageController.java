package sl.qr.mh.controller.eqp.hw;

import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sl.qr.mh.service.eqp.hw.hwManageService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 *  장비관리 > H/W 관리
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/eqp/hw")
public class hwManageController {

    private final hwManageService hwManageService;

    public hwManageController(hwManageService hwManageService) {
        this.hwManageService = hwManageService;
    }

    /**
     * H/W관리 > 장비목록 > 조회 뷰 페이지
     *
     * @return 장비 목록 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/eqp/hw/view";
    }


    /**
     * H/W관리 > 장비목록 > 장비목록 데이터
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터 및 기타 메타 정보
     */
    @ResponseBody
    @PostMapping("/list")
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return hwManageService.getEquipmentTotalList(paramMap);
    }

    @ResponseBody
    @PostMapping("/equipmentSoftwareList")
    public Map<String, Object> getEquipmentSoftwareList(@RequestBody Map<String, Object> paramMap) {
        return hwManageService.getEquipmentSoftwareList(paramMap);
    }

    /**
     * H/W관리 > 장비목록 > 장비 삭제
     *
     * @param deleteList 삭제할 장비 목록
     * @return 삭제 결과
     */
    @ResponseBody
    @PostMapping("/delete")
    public Map<String, Object> delete(@RequestBody List<Map<String, Object>> deleteList) {
        return hwManageService.deleteEqpList(deleteList);
    }

    /**
     * H/W관리 > 장비목록 > 추가 뷰 페이지
     *
     * @return 장비 추가 뷰 페이지
     */
    @GetMapping("/create")
    public String createEquipmentPage() {
        return "views/eqp/hw/register";
    }

    /**
     * H/W관리 > 장비목록 > 추가 > 장비 정보 저장
     *
     * @return 장비 저장 결과
     */
    @ResponseBody
    @PostMapping("/saveEquipmentInfo")
    public Map<String, Object> saveEquipmentInfo(@RequestBody Map<String, Object> paramMap) {
        return hwManageService.insertEqpList(paramMap);
    }

    /**
     * H/W관리 > 장비목록 > 상세 뷰 페이지
     *
     * @return 장비 상세 뷰 페이지
     */
    @GetMapping("/detail/{id}")
    public String detailEquipmentPage(@PathVariable("id") String eqp_manage_id, Model model) {
        Map<String, Object> result = hwManageService.getEquipmentDetailTotalList(eqp_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("equipment", result.get("selectData"));
            return "views/eqp/hw/detail";
        }
        else{
            return "views/error/error";
        }
    }

    /**
     * H/W관리 > 장비목록 > 수정 / 상세 > 장비 연결정보 데이터
     *
     * @return 장비 연걸정보 리스트
     */
    @ResponseBody
    @PostMapping("/selectEqpLinkList")
    public Map<String, Object> getEquipmentLinkList(@RequestBody Map<String, Object> paramMap) {
        return hwManageService.getEqpLinkList(paramMap);
    }


    /**
     * H/W관리 > 장비목록 > 수정 뷰 페이지
     *
     * @return 장비 수정 뷰 페이지
     */
    @GetMapping("/update/{id}")
    public String updateEquipmentPage(@PathVariable("id") String eqp_manage_id, Model model) {
        Map<String, Object> result = hwManageService.getEquipmentUpdateTotalList(eqp_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("equipment",       result.get("selectData"));
            model.addAttribute("config_category", result.get("config_category"));
            model.addAttribute("asset_category",  result.get("asset_category"));
            model.addAttribute("sub_category",    result.get("sub_category"));
            model.addAttribute("detail_category", result.get("detail_category"));

            return "views/eqp/hw/update";
        }
        else{
            return "views/error/error";
        }
    }

    /**
     * H/W관리 > 장비목록 > 수정 > 장비 정보 수정
     *
     * @return 장비 수정 결과
     */
    @ResponseBody
    @PostMapping("/updateEquipmentInfo")
    public Map<String, Object> updateEquipmentInfo(@RequestBody Map<String, Object> paramMap) {
        return hwManageService.updateEqpList(paramMap);
    }



    /**
     * H/W관리 > 장비목록 > 장비 목록 다운로드
     * wb : 모든 장비 목록 리스트
     */
    @ResponseBody
    @PostMapping("/excelDownload")
    public void excelDownloadEquipmentList(HttpServletResponse response) throws IOException {
        Workbook wb = hwManageService.excelDownloadEquipmentList();
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=equipmentListTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }


    /**
     * H/W관리 > 장비목록 > 장비 목록 업로드 > 엑셀 양식 다운로드
     *
     * @param response HTTP 응답 객체
     * @throws NumberFormatException 숫자 형식 오류
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @PostMapping("/excelTemplate")
    public void excelTemplate(HttpServletResponse response) throws IOException {
        Workbook wb = hwManageService.excelTemplate();
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=equipmentUploadTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }


    /**
     * H/W관리 > 장비목록 > 장비 목록 업로드 > 검증 > 업로드된 엑셀 파일의 유효성 검사
     *
     * @param file 업로드된 엑셀 파일
     * @param response HTTP 응답 객체
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @PostMapping("/excelValid")
    public void excelValid(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws IOException {
        Workbook wb = hwManageService.excelValidation(file);
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=validEquipmentUploadTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }


    /**
     * H/W관리 > 장비목록 > 장비 목록 업로드 > 업로드된 엑셀 파일 데이터 저장
     *
     * @param file 업로드된 엑셀 파일
     * @return 삽입 결과
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @PostMapping("/excelInsert")
    public Map<String, Object> excelInsert(@RequestParam("file") MultipartFile file) throws IOException {
        return hwManageService.insertExcelList(file);
    }


    /**
     * H/W관리 > 장비목록 > 장비 목록 업로드 > 저장 결과가 담긴 엑셀 파일 반환
     *
     * @param paramMap 저장결과 파라미터 맵
     * @param response HTTP 응답 객체
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @PostMapping("/excelResponse")
    public void excelResponse(@RequestBody Map<String, Object> paramMap, HttpServletResponse response) throws IOException {
        Workbook wb = hwManageService.saveResultEquipment(paramMap);
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=saveResultEquipment.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }
}
