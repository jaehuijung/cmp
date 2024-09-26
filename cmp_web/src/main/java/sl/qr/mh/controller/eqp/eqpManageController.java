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
    private final qrService qrService;
    private final cableService cableservice;

    public eqpManageController(qrService qrService, eqpManageService eqpManageService, cableService cableservice) {
        this.eqpManageService = eqpManageService;
        this.qrService = qrService;
        this.cableservice = cableservice;
    }

    /**
     * 장비관리 > 장비목록 페이지
     * @return 장비 목록 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/eqp/view";
    }


    /**
     * 장비관리 > 장비목록 > 장비 목록 데이터
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터 및 기타 메타 정보
     */
    @ResponseBody
    @PostMapping("/list")
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return eqpManageService.getEqpList(paramMap);
    }


    /**
     * 장비관리 > 장비목록 > 선택된 장비 목록 삭제
     * @param deleteList 삭제할 장비 목록
     * @return 삭제 결과
     */
    @ResponseBody
    @PostMapping("/delete")
    public Map<String, Object> delete(@RequestBody List<Map<String, Object>> deleteList) {
        return eqpManageService.deleteEqpList(deleteList);
    }


    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 업로드 양식 엑셀 파일 다운로드
     *
     * @param response HTTP 응답 객체
     * @throws NumberFormatException 숫자 형식 오류
     * @throws IOException 입력/출력 예외
     */
    @ResponseBody
    @GetMapping("/excelTemplate")
    public void excelTemplate(HttpServletResponse response) throws NumberFormatException, IOException {
        Workbook wb = eqpManageService.excelTemplate();
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=equipmentUploadTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }


    /**
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


    @GetMapping("/create")
    public String createEquipmentPage() {
        return "views/eqp/register";
    }

    @ResponseBody
    @GetMapping("/selectConfig")
    public Map<String, Object> getSelectConfigData() {
        return eqpManageService.getSelectConfigData();
    }

    @ResponseBody
    @GetMapping("/selectAsset")
    public Map<String, Object> getSelectAssetData(@RequestParam Map<String, Object> paramMap) {
        return eqpManageService.getSelectAssetData(paramMap);
    }


    @ResponseBody
    @GetMapping("/selectSub")
    public Map<String, Object> getSelectSubData(@RequestParam Map<String, Object> paramMap) {
        return eqpManageService.getSelectSubData(paramMap);
    }


    @ResponseBody
    @GetMapping("/selectDetail")
    public Map<String, Object> getSelectDetailData(@RequestParam Map<String, Object> paramMap) {
        return eqpManageService.getSelectDetailData(paramMap);
    }


    @ResponseBody
    @PostMapping("/saveEquipmentInfo")
    public void saveEquipmentInfo(@RequestBody Map<String, Object> dataMap) {
        System.out.println("Received Data: " + dataMap);

        if (dataMap.containsKey("eqp_name")) {
            System.out.println("장비명: " + dataMap.get("eqp_name"));
        }
    }

    @GetMapping("/detail/{id}")
    public String detailEquipmentPage(@PathVariable("id") Long id, Model model) {
        //장비 ID로 실제 데이터를 조회하는 로직
        // Equipment equipment = equipmentService.getById(id);
        // model.addAttribute("equipment", equipment);
        return "views/eqp/detail";
    }

    @GetMapping("/update/{id}")
    public String updateEquipmentPage(@PathVariable("id") Long id, Model model) {
        //장비 ID로 실제 데이터를 조회하는 로직
        // Equipment equipment = equipmentService.getById(id);
        // model.addAttribute("equipment", equipment);
        return "views/eqp/update";
    }

    // @PostMapping("/eqpManage/update")
    // public String updateEquipment(Equipment equipment) {
    //     equipmentService.update(equipment); //장비 수정 로직
    //     return "redirect:/eqpManage/list";
    // }


    /************************************/
    // 아직 변경 안한놈들

    // 장비관리 > 장비목록 > 삭제


    // 장비관리 > 장비추가 > 등록
    @GetMapping("/eqpinsert")
    public String geteqpInsert(HttpSession session, HttpServletRequest request) {
        return "eqpinsert";

    }


    //
    @PostMapping("/eqp/insert")
    public String eqpinsert(Equipment vo, HttpServletRequest request) {
        cableservice.insertEqp(vo);

        return "views/eqp/view";
    }

    @GetMapping(value = "/eqp/exceldown")
    public void exceldown(HttpSession session, HttpServletRequest request, HttpServletResponse response, Equipment vo)
            throws NumberFormatException, IOException {

        List<Equipment> list = cableservice.selectSearchEqp(vo);
        Workbook wb = qrService.EqpExcel(list);
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=exceldown.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }

    /*****************/
    // 과거 리스트... 나중에 지우기
    // 장비관리 > 장비목록 > 장비추가 모달 > 장비 데이터 추가
    @ResponseBody
    @PostMapping("/insertEqp")
    public Map<String, Object> insert(@RequestParam Map<String, Object> insertMap) {
        return eqpManageService.insertEqpList(insertMap);
    }

    // 장비관리 > 장비목록 > 장비수정 모달 > 장비 데이터
    @ResponseBody
    @GetMapping("/update")
    public Map<String, Object> update(@RequestParam("eqp_id") String eqp_id) {
        return eqpManageService.getEqpUpdateList(eqp_id); // 수정 팝업에서 보여질 데이터
    }


    // 장비관리 > 장비목록 > 장비수정 모달 > 장비 데이터 수정
    @ResponseBody
    @PostMapping("/updateEqp")
    public Map<String, Object> update(@RequestParam Map<String, Object> updateMap) {
        return eqpManageService.updateEqpList(updateMap);
    }

    /*
    // alert2
    function alert2(title, html, icon, confirmButtonText, callback) {
        Swal.fire({
            title: title,
            html: html,
            icon: icon,
            confirmButtonText: confirmButtonText
        }).then((result) => {
            if (callback) {
                callback();
            }
        });
    }


    // 장비관리 > 장비목록 > 리스트
    @ResponseBody
    @GetMapping("/list")
    public Map<String, Object> listGET(Map<String, Object> paramMap) {
        return eqpManageService.getEqpList(paramMap);
    }

    // 장비관리 > 장비추가 페이지
    @GetMapping("/register")
    public String register(HttpSession session, HttpServletRequest request) {
        return "/views/eqp/register";

    }

    // 장비관리 > 장비목록 > 장비상세 페이지
    @GetMapping("/detail")
    public String detail(@RequestParam("eqp_id") String eqp_id, HttpSession session, HttpServletRequest request, Model model) {
        model.addAttribute("Equipment", eqpManageService.getEqpDetailList(eqp_id));
        return "/views/eqp/detail";
    }

    // 장비관리 > 장비목록 > 장비수정 페이지
    @GetMapping("/update")
    public String update(Equipment vo, HttpSession session, HttpServletRequest request, Model model) {
        vo = cableservice.selectupdateEqp(vo);
        model.addAttribute("Equipment", vo);

        return "/views/eqp/update";
    }
     */

    /*
    // 장비관리 > 장비목록 > 장비상세 데이터 ... 상세는 그냥 없애자 수정으로 대체
    @ResponseBody
    @GetMapping("/detail")
    public Map<String, Object> detail1(@RequestParam("eqp_id") String eqp_id) {
        return eqpManageService.getEqpDetailList(eqp_id); // 상세 팝업에서 보여질 데이터
    }

    @PostMapping("/delete")
    public String eqpDelete(Equipment vo, HttpSession session, HttpServletRequest request, Model model) {
        cableservice.deleteEqp(vo);

        return "views/eqp/view";
    }

    // 장비관리 > 장비목록 > 장비수정 모달 > 장비 데이터 수정
    @PostMapping("/update_eqp")
    public String update(Equipment vo, HttpSession session, HttpServletRequest request, Model model) {
        cableservice.updateEqp(vo);

        return "views/eqp/view";
    }
     */

}
