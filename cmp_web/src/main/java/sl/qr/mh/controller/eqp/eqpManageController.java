package sl.qr.mh.controller.eqp;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sl.qr.mh.service.cableService;
import sl.qr.mh.service.eqp.eqpManageService;
import sl.qr.mh.service.qrService;
import sl.qr.mh.vo.Equipment;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/eqpManage")
public class eqpManageController {

    private final eqpManageService eqpManageService;

    public eqpManageController(qrService qrService, eqpManageService eqpManageService, cableService cableservice) {
        this.eqpManageService = eqpManageService;
    }

    /**
     * 장비관리 > 장비목록
     *
     * @return 장비 목록 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/eqp/view";
    }


    /**
     * 장비관리 > 장비목록
     * 장비 목록 데이터
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터 및 기타 메타 정보
     */
    @ResponseBody
    @PostMapping("/list")
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return eqpManageService.getEquipmentTotalList(paramMap);
    }


    /**
     * 장비관리 > 장비목록
     * 선택된 장비 목록 삭제
     *
     * @param deleteList 삭제할 장비 목록
     * @return 삭제 결과
     */
    @ResponseBody
    @PostMapping("/delete")
    public Map<String, Object> delete(@RequestBody List<Map<String, Object>> deleteList) {
        return eqpManageService.deleteEqpList(deleteList);
    }


    /**
     * 장비관리 > 장비목록 > 장비 업로드
     * 업로드 양식 엑셀 파일 다운로드
     *
     * @param response HTTP 응답 객체
     * @throws NumberFormatException 숫자 형식 오류
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @GetMapping("/excelTemplate")
    public void excelTemplate(HttpServletResponse response) throws IOException {
        Workbook wb = eqpManageService.excelTemplate();
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=equipmentUploadTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }


    /**
     * 장비관리 > 장비목록 > 장비 업로드
     * 업로드된 엑셀 파일의 유효성을 검사하고 결과 반환
     *
     * @param file 업로드된 엑셀 파일
     * @param response HTTP 응답 객체
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @PostMapping("/excelValid")
    public void excelValid(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws IOException {
        Workbook wb = eqpManageService.excelValidation(file);
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=validEquipmentUploadTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }


    /**
     * 장비관리 > 장비목록 > 장비 업로드
     * 업로드된 엑셀 파일 데이터 DB 저장
     *
     * @param file 업로드된 엑셀 파일
     * @return 삽입 결과
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @PostMapping("/excelInsert")
    public Map<String, Object> excelInsert(@RequestParam("file") MultipartFile file) throws IOException {
        return eqpManageService.insertExcelList(file);
    }


    /**
     * 장비관리 > 장비목록 > 장비 업로드
     * 저장 결과를 엑셀 파일로 생성하여 반환.
     *
     * @param paramMap 저장결과 파라미터 맵
     * @param response HTTP 응답 객체
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @PostMapping("/excelResponse")
    public void excelResponse(@RequestBody Map<String, Object> paramMap, HttpServletResponse response) throws IOException {
        Workbook wb = eqpManageService.saveResultEquipment(paramMap);
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=saveResultEquipment.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }

    /**
     * 장비관리 > 장비목록 > 추가
     *
     * @return 장비 추가 뷰 페이지
     */
    @GetMapping("/create")
    public String createEquipmentPage() {
        return "views/eqp/register";
    }

    /**
     * 장비관리 > 장비목록 > 추가
     *
     * @return 장비분류 구성분류 리스트
     */
    @ResponseBody
    @GetMapping("/selectConfig")
    public Map<String, Object> getSelectConfigData() {
        return eqpManageService.getSelectConfigData();
    }

    /**
     * 장비관리 > 장비목록 > 추가
     *
     * @return 장비분류 자산분류 리스트
     */

    @ResponseBody
    @GetMapping("/selectAsset")
    public Map<String, Object> getSelectAssetData(@RequestParam Map<String, Object> paramMap) {
        return eqpManageService.getSelectAssetData(paramMap);
    }

    /**
     * 장비관리 > 장비목록 > 추가
     *
     * @return 장비분류 자산세부분류 리스트
     */
    @ResponseBody
    @GetMapping("/selectSub")
    public Map<String, Object> getSelectSubData(@RequestParam Map<String, Object> paramMap) {
        return eqpManageService.getSelectSubData(paramMap);
    }

    /**
     * 장비관리 > 장비목록 > 추가
     *
     * @return 장비분류 자산상세분류 리스트
     */
    @ResponseBody
    @GetMapping("/selectDetail")
    public Map<String, Object> getSelectDetailData(@RequestParam Map<String, Object> paramMap) {
        return eqpManageService.getSelectDetailData(paramMap);
    }

    /**
     * 장비관리 > 장비목록 > 추가
     * 장비 저장
     *
     * @return 장비 저장 결과
     */
    @ResponseBody
    @PostMapping("/saveEquipmentInfo")
    public Map<String, Object> saveEquipmentInfo(@RequestBody Map<String, Object> paramMap) {
        return eqpManageService.insertEqpList(paramMap);
    }

    /**
     * 장비관리 > 장비목록 > 상세
     *
     * @return 장비 상세 뷰 페이지
     */
    @GetMapping("/detail/{id}")
    public String detailEquipmentPage(@PathVariable("id") String eqp_manage_id, Model model) {
        Map<String, Object> result = eqpManageService.getEquipmentDetailTotalList(eqp_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("equipment", result.get("selectData"));
            return "views/eqp/detail";
        }
        else{
            return "views/error/error";
        }
    }

    /**
     * 장비관리 > 장비목록 > 수정
     *
     * @return 장비 수정 뷰 페이지
     */
    @GetMapping("/update/{id}")
    public String updateEquipmentPage(@PathVariable("id") String eqp_manage_id, Model model) {
        Map<String, Object> result = eqpManageService.getEquipmentUpdateTotalList(eqp_manage_id);
        if((boolean) result.get("errorCode")){
            model.addAttribute("equipment",       result.get("selectData"));
            model.addAttribute("config_category", result.get("config_category"));
            model.addAttribute("asset_category",  result.get("asset_category"));
            model.addAttribute("sub_category",    result.get("sub_category"));
            model.addAttribute("detail_category", result.get("detail_category"));

            return "views/eqp/update";
        }
        else{
            return "views/error/error";
        }
    }

}
