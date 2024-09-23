package sl.qr.mh.service.eqp;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sl.qr.mh.service.cableMapper;

import java.io.FileInputStream;
import java.io.IOException;
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


    private final String sep = "/";
    private final String staticPath = System.getProperty("user.dir") + sep + "src" + sep + "main" + sep + "resources" + sep + "static" + sep;

    public Workbook excelTemplate() throws IOException {
        String templatesPath = staticPath + "excelTemplate" + sep + "equipmentUploadTemplate.xlsx";
        FileInputStream file = new FileInputStream(templatesPath);

        Workbook wb = new XSSFWorkbook(file);
        Sheet sheet = wb.getSheetAt(1);
        int sheetRowNumber = sheet.getPhysicalNumberOfRows();

        // 헤더
        Row rowHeader = sheet.getRow(0);

        // 데이터 컬럼 : 세 번째 행부터
        for(int rowIndex=3; rowIndex < sheetRowNumber; rowIndex++){
            Row row = sheet.getRow(rowIndex);

            // 엑셀 데이터 저장할 컬럼
            Map<String,Object> excelCellProcessMap = new HashMap<>();
            excelCellProcessMap.put("errorCode", true);

            if(row != null) {
                // 데이터 컬럼 : 두 번째 열부터
                for (int cnt = 1; cnt < 41; cnt++) {
                    Cell cellHeader = rowHeader.getCell(cnt);
                    Cell cellValue = row.getCell(cnt);

                    excelCellProcessMap.putAll(excelCellProcess(cellHeader, cellValue));
                }

                // 검증에서 성공/실패 데이터 저장
                if((boolean) excelCellProcessMap.get("errorCode")) {
                    validDataToSheet(wb, 2, excelCellProcessMap); // 세 번째 시트는 인덱스 2
                    validDataToSheet(wb, 3, excelCellProcessMap); // 네 번째 시트는 인덱스 3
                }

            }
        }

        return wb;
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

    /*****************/
    // 과거 리스트... 나중에 지우기

}
