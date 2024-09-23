package sl.qr.mh.controller.eqp;

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
    @PostMapping("/insert_eqp")
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
    @PostMapping("/update_eqp")
    public Map<String, Object> update(@RequestParam Map<String, Object> updateMap) {

        // Map<String, Object> returnMap = new HashMap<>();
        // return returnMap;

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
    @PostMapping("/excel_template")
    public void excelTemplate(HttpServletResponse response) throws NumberFormatException, IOException {
        Workbook wb = eqpManageService.excelTemplate();
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=equipment_template.xlsx");

        wb.write(response.getOutputStream()); wb.close();
        wb.close();

        // Map<String ,Object> returnMap = new HashMap<>();
        // returnMap.put("errorCode",true);
        // return returnMap;
    }


    @ResponseBody
    @PostMapping("/excelTest")
    // public Map<String, Object> excelTest(@RequestParam("file") MultipartFile file) throws IOException {
    public void excelTest(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws IOException {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", true);

        // 엑셀 파일 검증 로직
        Workbook wb = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = wb.getSheetAt(1); // 첫 번째 시트를 가져옵니다.
        int sheetRowNumber = sheet.getPhysicalNumberOfRows();

        // 헤더
        Row rowHeader = sheet.getRow(0);

        // 데이터 컬럼 : 세 번째 행부터
        for(int rowIndex=3; rowIndex < sheetRowNumber; rowIndex++){
            Row row = sheet.getRow(rowIndex);

            // 엑셀 데이터 저장할 컬럼
            Map<String, Object> excelCellProcessMap = new HashMap<>();
            excelCellProcessMap.put("errorCode", true);

            if (row != null) {
                // 데이터 컬럼 : 두 번째 열부터
                for (int cnt = 1; cnt < 41; cnt++) {
                    Cell cellHeader = rowHeader.getCell(cnt);
                    Cell cellValue = row.getCell(cnt);

                    excelCellProcessMap.putAll(excelCellProcess(cellHeader, cellValue));
                }
            }

            // 검증에서 성공/실패 데이터 저장
            if((boolean) excelCellProcessMap.get("errorCode")) {
                validDataToSheet(wb, 2, excelCellProcessMap); // 세 번째 시트는 인덱스 2
                validDataToSheet(wb, 3, excelCellProcessMap); // 네 번째 시트는 인덱스 3
            }
        }

        // return returnMap;
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=equipment_template.xlsx");

        wb.write(response.getOutputStream()); wb.close();
        wb.close();
    }

    public Map<String, Object> excelCellProcess(Cell cellHeader, Cell cellValue) {
        Map<String, Object> processMap = new HashMap<>();

        String cellHeaderStr = cellHeader.getStringCellValue();
        if (cellValue != null) {
            if (isNumericColumn(cellHeaderStr)) {
                processNumericColumn(cellHeaderStr, cellValue, processMap);
            } else {
                processStringColumn(cellHeaderStr, cellValue, processMap);
            }
        } else {
            processEmptyCell(cellHeaderStr, processMap);
        }

        return processMap;
    }

    private boolean isNumericColumn(String cellHeaderStr) {
        return cellHeaderStr.equals("acquisition_cost")
                || cellHeaderStr.equals("dbrain_number")
                || cellHeaderStr.equals("installation_units")
                || cellHeaderStr.equals("equipment_size_units");
    }

    private void processNumericColumn(String cellHeaderStr, Cell cellValue, Map<String, Object> processMap) {
        switch (cellValue.getCellType()) {
            case NUMERIC:
                processMap.put(cellHeaderStr, cellValue.getNumericCellValue());
                break;
            case BOOLEAN:
                processMap.put(cellHeaderStr, cellValue.getBooleanCellValue());
                processMap.put("errorCode", false);
                break;
            case FORMULA:
                processMap.put(cellHeaderStr, cellValue.getCellFormula());
                processMap.put("errorCode", false);
                break;
            default:
                processMap.put(cellHeaderStr, cellValue.getStringCellValue());
                processMap.put("errorCode", false);
                break;
        }
    }

    private void processStringColumn(String cellHeaderStr, Cell cellValue, Map<String, Object> processMap) {
        switch (cellValue.getCellType()) {
            case STRING:
                processMap.put(cellHeaderStr, cellValue.getStringCellValue());
                break;
            case NUMERIC:
                processMap.put(cellHeaderStr, String.valueOf(cellValue.getNumericCellValue()));
                break;
            case BOOLEAN:
                processMap.put(cellHeaderStr, String.valueOf(cellValue.getBooleanCellValue()));
                break;
            case FORMULA:
                processMap.put(cellHeaderStr, cellValue.getCellFormula());
                break;
            default:
                processMap.put(cellHeaderStr, "");
                break;
        }
    }

    private void processEmptyCell(String cellHeaderStr, Map<String, Object> processMap) {
        if (isNumericColumn(cellHeaderStr)) {
            processMap.put(cellHeaderStr, 0);
        } else {
            processMap.put(cellHeaderStr, "");
        }
    }

    public void validDataToSheet(Workbook workbook, int sheetIndex, Map<String, Object> data) {
        Sheet sheet = workbook.getSheetAt(sheetIndex);

        // 데이터 추가
        int lastRowNum = sheet.getLastRowNum();
        Row dataRow = sheet.createRow(lastRowNum + 1);
        dataRow.createCell(0).setCellValue((String) data.get("eqp_name"));
        dataRow.createCell(1).setCellValue((String) data.get("hostname"));
        dataRow.createCell(2).setCellValue((String) data.get("m_company"));
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
