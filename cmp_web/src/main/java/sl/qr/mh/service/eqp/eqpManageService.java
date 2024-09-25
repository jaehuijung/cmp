package sl.qr.mh.service.eqp;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import sl.qr.mh.service.cableMapper;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class eqpManageService {


    private final cableMapper cableMapper;

    public eqpManageService(cableMapper cableMapper) {
        this.cableMapper = cableMapper;
    }

    /*************/
    // 새로 작성한놈들

    // 장비관리 > 장비목록 > 리스트
    @SuppressWarnings("unchecked")
    public Map<String, Object> getEqpList(Map<String, Object> paramMap) {

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {

            Map<String, Object> searchData = null;
            if (paramMap.containsKey("searchData")) {
                searchData = (Map<String, Object>) paramMap.get("searchData");
                paramMap.putAll(searchData);
            }


            List<Map<String, Object>> rows = cableMapper.getEqpTotalList(paramMap);
            int total = cableMapper.getEqpTotalListCnt(paramMap);

            returnMap.put("rows", rows);
            returnMap.put("total", total);
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }

    // 장비관리 > 장비목록 > 상세 데이터
    public Map<String, Object> getEqpDetailList(String param) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            Map<String, Object> rows = cableMapper.getEqpDetailList(param);
            returnMap.put("rows", rows);
            returnMap.put("errorCode",true);


        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;


    }

    // 장비관리 > 장비목록 > 수정 데이터
    public Map<String, Object> getEqpUpdateList(String param) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            Map<String, Object> rows = cableMapper.getEqpDetailList(param);
            returnMap.put("rows", rows);
            returnMap.put("errorCode",true);


        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }


    // 장비관리 > 장비목록 > 장비 추가
    @Transactional
    public Map<String, Object> insertEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            cableMapper.insertEqpList(paramMap);
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }


    // 장비관리 > 장비목록 > 장비 수정
    @Transactional
    public Map<String, Object> updateEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            cableMapper.updateEqpList(paramMap);
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }

    // 장비관리 > 장비목록 > 삭제
    @Transactional
    public Map<String, Object> deleteEqpList(List<Map<String, Object>> deleteList) {

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            for(Map<String, Object> ele : deleteList){
                String deleteEqpTarget = ele.get("eqp_id").toString();
                cableMapper.deleteEqpList(deleteEqpTarget);
            }

            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }


    @Transactional
    public Map<String, Object> insertExcelList(MultipartFile file) throws IOException {
        Map<String, Object> returnMap = new HashMap<>();
        List<Map<String, Object>> successList = new ArrayList<>();
        List<Map<String, Object>> failList = new ArrayList<>();

        Workbook wb = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = wb.getSheetAt(1);
        int sheetRowNumber = sheet.getPhysicalNumberOfRows();

        Row rowHeader = sheet.getRow(0);

        for(int rowIndex=3; rowIndex < sheetRowNumber; rowIndex++) {
            Map<String, Object> insertExcelMap = new HashMap<>();
            try {
                Row row = sheet.getRow(rowIndex);

                if (row != null) {
                    for (int cnt = 1; cnt < 41; cnt++) {
                        Cell cellHeader = rowHeader.getCell(cnt);
                        Cell cellValue = row.getCell(cnt);

                        insertExcelMap.putAll(excelCellProcess(cellHeader, cellValue));
                    }
                }

                cableMapper.insertEqpList(insertExcelMap);
                successList.add(insertExcelMap);

            } catch (Exception e) {
                failList.add(insertExcelMap);
            }
        }

        returnMap.put("successList", successList);
        returnMap.put("failList", failList);

        return returnMap;
    }

    public Workbook saveResultEquipment(Map<String, Object> paramMap) throws IOException {
        String resultPath = staticPath + "equipmentResultTemplate.xlsx";
        FileInputStream file = new FileInputStream(resultPath);
        Workbook wb = new XSSFWorkbook(file);

        return wb;
    }

    private final String sep = "/";
    private final String staticPath = System.getProperty("user.dir") + sep + "src" + sep + "main" + sep + "resources" + sep + "static" + sep + "excelTemplate" + sep;

    public Workbook excelTemplate() throws IOException {
        String uploadPath = staticPath + "equipmentUploadTemplate.xlsx";
        FileInputStream file = new FileInputStream(uploadPath);
        Workbook wb = new XSSFWorkbook(file);

        return wb;
    }

    // 업로드 된 장비파일 검증
    public Workbook excelValidation(MultipartFile file) throws IOException {
        Workbook wb = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = wb.getSheetAt(1);
        int sheetRowNumber = sheet.getPhysicalNumberOfRows();

        Row rowHeader = sheet.getRow(0);

        for(int rowIndex=3; rowIndex < sheetRowNumber; rowIndex++){
            Row row = sheet.getRow(rowIndex);

            Map<String, Object> excelCellProcessMap = new HashMap<>();
            excelCellProcessMap.put("errorCode", true);

            if (row != null) {
                for (int cnt = 1; cnt < 41; cnt++) {
                    Cell cellHeader = rowHeader.getCell(cnt);
                    Cell cellValue = row.getCell(cnt);

                    excelCellProcessMap.putAll(excelCellProcess(cellHeader, cellValue));
                }
            }

            if((boolean) excelCellProcessMap.get("errorCode")) {
                validDataToSheet(wb, 2, excelCellProcessMap);
            }
            else {
                validDataToSheet(wb, 3, excelCellProcessMap);
            }
        }

        return wb;
    }

    // 장비파일 검증용 메서드1 : 문자/숫자 셀 형식 찾기
    private Map<String, Object> excelCellProcess(Cell cellHeader, Cell cellValue) {
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

    // 장비파일 검증용 메서드2 : 숫자만 들어가야 하는 컬럼들
    private boolean isNumericColumn(String cellHeaderStr) {
        return cellHeaderStr.equals("acquisition_cost")
                || cellHeaderStr.equals("dbrain_number")
                || cellHeaderStr.equals("installation_units")
                || cellHeaderStr.equals("equipment_size_units");
    }

    // 장비파일 검증용 메서드3 : 셀이 숫자여야 할 때
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

    // 장비파일 검증용 메서드4 : 셀이 문자여야 할 때
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

    // 장비파일 검증용 메서드5 : 셀이 비었을 때 처리
    private void processEmptyCell(String cellHeaderStr, Map<String, Object> processMap) {
        if (isNumericColumn(cellHeaderStr)) {
            processMap.put(cellHeaderStr, 0);
        } else {
            processMap.put(cellHeaderStr, "");
        }
    }

    // 장비파일 검증용 메서드6 : workbook 시트에 셀 값 지정
    public void validDataToSheet(Workbook workbook, int sheetIndex, Map<String, Object> data) {
        Sheet sheet = workbook.getSheetAt(sheetIndex);
        int lastRowNum = sheet.getLastRowNum();

        Row dataRow = sheet.createRow(lastRowNum + 1);

        setCellValue(sheetIndex, 1,  workbook, dataRow, data.get("eqp_name"));
        setCellValue(sheetIndex, 2,  workbook, dataRow, data.get("hostname"));
        setCellValue(sheetIndex, 3,  workbook, dataRow, data.get("m_company"));
        setCellValue(sheetIndex, 4,  workbook, dataRow, data.get("model"));
        setCellValue(sheetIndex, 5,  workbook, dataRow, data.get("yearofintroduct"));
        setCellValue(sheetIndex, 6,  workbook, dataRow, data.get("config_category"));
        setCellValue(sheetIndex, 7,  workbook, dataRow, data.get("config_id"));
        setCellValue(sheetIndex, 8,  workbook, dataRow, data.get("asset_category"));
        setCellValue(sheetIndex, 9,  workbook, dataRow, data.get("asset_id"));
        setCellValue(sheetIndex, 10, workbook, dataRow, data.get("manage_number"));
        setCellValue(sheetIndex, 11, workbook, dataRow, data.get("manage_id"));
        setCellValue(sheetIndex, 12, workbook, dataRow, data.get("ip_address"));
        setCellValue(sheetIndex, 13, workbook, dataRow, data.get("os_version"));
        setCellValue(sheetIndex, 14, workbook, dataRow, data.get("operating_department"));
        setCellValue(sheetIndex, 15, workbook, dataRow, data.get("primary_operator"));
        setCellValue(sheetIndex, 16, workbook, dataRow, data.get("secondary_operator"));
        setCellValue(sheetIndex, 17, workbook, dataRow, data.get("primary_outsourced_operator"));
        setCellValue(sheetIndex, 18, workbook, dataRow, data.get("secondary_outsourced_operator"));
        setCellValue(sheetIndex, 19, workbook, dataRow, data.get("operating_status"));
        setCellValue(sheetIndex, 20, workbook, dataRow, data.get("eol_status"));
        setCellValue(sheetIndex, 21, workbook, dataRow, data.get("eos_status"));
        setCellValue(sheetIndex, 22, workbook, dataRow, data.get("redundancy_config"));
        setCellValue(sheetIndex, 23, workbook, dataRow, data.get("network_operation_type"));
        setCellValue(sheetIndex, 24, workbook, dataRow, data.get("asset_acquisition_date"));
        setCellValue(sheetIndex, 25, workbook, dataRow, data.get("asset_disposal_date"));
        setCellValue(sheetIndex, 26, workbook, dataRow, data.get("acquisition_cost"));
        setCellValue(sheetIndex, 27, workbook, dataRow, data.get("dbrain_number"));
        setCellValue(sheetIndex, 28, workbook, dataRow, data.get("domestic"));
        setCellValue(sheetIndex, 29, workbook, dataRow, data.get("unit_position"));
        setCellValue(sheetIndex, 30, workbook, dataRow, data.get("installation_coordinates"));
        setCellValue(sheetIndex, 31, workbook, dataRow, data.get("installation_units"));
        setCellValue(sheetIndex, 32, workbook, dataRow, data.get("equipment_size_units"));
        setCellValue(sheetIndex, 33, workbook, dataRow, data.get("resource_name"));
        setCellValue(sheetIndex, 34, workbook, dataRow, data.get("maintenance_contract_target"));
        setCellValue(sheetIndex, 35, workbook, dataRow, data.get("cpu"));
        setCellValue(sheetIndex, 36, workbook, dataRow, data.get("mem"));
        setCellValue(sheetIndex, 37, workbook, dataRow, data.get("disk"));
        setCellValue(sheetIndex, 38, workbook, dataRow, data.get("serial_number"));
        setCellValue(sheetIndex, 39, workbook, dataRow, data.get("created_at"));
        setCellValue(sheetIndex, 40, workbook, dataRow, data.get("remarks"));
    }

    // 장비파일 검증용 메서드7 : 문자인지 숫자인지 구분해서 셀 값 지정
    private void setCellValue(int sheetIndex, int cellIndex, Workbook workbook, Row dataRow, Object value) {
        if (value == null) {
            dataRow.createCell(cellIndex).setCellValue("");
        } else if (value instanceof String) {
            dataRow.createCell(cellIndex).setCellValue((String) value);
        } else if (value instanceof Number) {
            dataRow.createCell(cellIndex).setCellValue(((Number) value).doubleValue());
        } else {
            dataRow.createCell(cellIndex).setCellValue(value.toString());
        }

        // 실패한 셀에 빨간색
        // 음 이건 errorCode 받아올 때 무슨 셀에 칠할지 추가로 체크해야하는데
        // 다른거 먼저 하고나서 합시다
        // if(sheetIndex == 3){
        //     Cell firstCell = dataRow.createCell(sheetIndex);
        //     CellStyle style = workbook.createCellStyle();
        //     style.setFillForegroundColor(IndexedColors.RED.getIndex());
        //     style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        //     firstCell.setCellStyle(style);
        // }
    }



    /************************************/
    // 아직 변경 안한놈들

    /*****************/
    // 과거 리스트... 나중에 지우기

}
