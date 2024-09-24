package sl.qr.mh.controller.eqp;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sl.qr.mh.service.cableService;
import sl.qr.mh.service.eqp.eqpManageService;
import sl.qr.mh.service.qrService;
import sl.qr.mh.vo.Equipment;

import java.io.IOException;
import java.util.HashMap;
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


    /*************/
    // 새로 작성한놈들

    // 장비관리 > 장비목록 페이지
    @GetMapping("/view")
    public String view(HttpSession session, HttpServletRequest request) {
        return "views/eqp/view";

    }

    // 장비관리 > 장비목록 > 리스트
    @ResponseBody
    @PostMapping("/list")
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return eqpManageService.getEqpList(paramMap);
    }


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

    // 장비관리 > 장비목록 > 삭제
    @ResponseBody
    @PostMapping("/delete")
    public Map<String, Object> delete(@RequestBody List<Map<String, Object>> deleteList) {
        return eqpManageService.deleteEqpList(deleteList);
    }


    // 장비관리 > 장비목록 > 장비 업로드 > 양식 다운로드
    @ResponseBody
    @GetMapping("/excelTemplate")
    public void excelTemplate(HttpServletResponse response) throws NumberFormatException, IOException {
        Workbook wb = eqpManageService.excelTemplate();
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=equipmentUploadTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }


    @ResponseBody
    @PostMapping("/excelValid")
    public void excelValid(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws IOException {
        Workbook wb = eqpManageService.excelValidation(file);
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=validEquipmentUploadTemplate.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }

    @ResponseBody
    @PostMapping("/excelSave")
    public Map<String, Object> excelSave(@RequestParam("file") MultipartFile file) throws IOException {
        return eqpManageService.insertExcelList(file);
    }

    @ResponseBody
    @PostMapping("/excelResponse")
    public void excelResponse(@RequestBody Map<String, Object> paramMap, HttpServletResponse response) throws IOException {
        Workbook wb = eqpManageService.saveResultEquipment(paramMap);
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=saveResultEquipment.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }

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
