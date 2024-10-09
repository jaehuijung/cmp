package sl.qr.mh.service.eqp;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class eqpManageService {


    private final eqpMapper eqpMapper;
    private final String sep = "/";
    private final String staticPath = System.getProperty("user.dir") + sep + "src" + sep + "main" + sep + "resources" + sep + "static" + sep + "excelTemplate" + sep;

    public eqpManageService(eqpMapper eqpMapper) {
        this.eqpMapper = eqpMapper;
    }

    /**
     * 장비관리 > 장비목록 > 장비 목록 데이터 가져오기
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getEquipmentTotalList(Map<String, Object> paramMap) {

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {

            if (paramMap.containsKey("searchData")) {
                paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
            }

            List<Map<String, Object>> rows = eqpMapper.getEquipmentTotalList(paramMap);
            int total = eqpMapper.getEquipmentTotalListCnt(paramMap);

            returnMap.put("rows", rows);
            returnMap.put("total", total);
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 엑셀 다운로드
     *
     * @return 장비 목록 데이터
     */
    @Transactional
    public Workbook excelDownloadEquipmentList() throws IOException {
        String resultPath = staticPath + "equipmentListTemplate.xlsx";
        FileInputStream file = new FileInputStream(resultPath);
        Workbook wb = new XSSFWorkbook(file);

        try {
            int sheetIndex = 0;

            List<Map<String, Object>> equipmentDetailTotalList = eqpMapper.getExcelEquipmentTotalList();
            for(Map<String, Object> ele : equipmentDetailTotalList) {
                insertDataToSheet(wb, sheetIndex, ele);
            }

            sheetIndex = 1;
            List<Map<String, Object>> equipmentLinkList = eqpMapper.getExcelEquipmentLinkList();
            for(Map<String, Object> ele : equipmentLinkList) {
                insertDataToSheet(wb, sheetIndex, ele);
            }

        } catch (Exception e){
            log.error(e.getMessage());
        }

        // 결과파일 생성 시 데이터 받아와서 엑셀 생성
        // 장비추가/수정/상세/삭제 기능 개발 완료 후 개발
        return wb;
    }


    /**
     * 장비관리 > 장비목록 > 엑셀 다운로드 : 시트에 데이터 입력
     *
     * @param workbook 엑셀 워크북 객체
     * @param sheetIndex 시트 인덱스
     * @param data 셀에 입력할 데이터 맵
     */
    private void insertDataToSheet(Workbook workbook, int sheetIndex, Map<String, Object> data) {

        Sheet sheet = workbook.getSheetAt(sheetIndex);
        int lastRowNum = sheet.getLastRowNum();

        Row dataRow = sheet.createRow(lastRowNum + 1);

        if(sheetIndex == 0) {
            setCellValue(sheetIndex, 0,  workbook, dataRow, data.get("eqp_manage_id"));
            setCellValue(sheetIndex, 1,  workbook, dataRow, data.get("eqp_name"));
            setCellValue(sheetIndex, 2,  workbook, dataRow, data.get("host_name"));
            setCellValue(sheetIndex, 3,  workbook, dataRow, data.get("m_company"));
            setCellValue(sheetIndex, 4,  workbook, dataRow, data.get("model_name"));
            setCellValue(sheetIndex, 5,  workbook, dataRow, data.get("config_category"));
            setCellValue(sheetIndex, 6,  workbook, dataRow, data.get("asset_category"));
            setCellValue(sheetIndex, 7,  workbook, dataRow, data.get("sub_category"));
            setCellValue(sheetIndex, 8,  workbook, dataRow, data.get("detail_category"));
            setCellValue(sheetIndex, 9,  workbook, dataRow, data.get("ip_address"));
            setCellValue(sheetIndex, 10, workbook, dataRow, data.get("os_version"));
            setCellValue(sheetIndex, 11, workbook, dataRow, data.get("operating_department"));
            setCellValue(sheetIndex, 12, workbook, dataRow, data.get("primary_operator"));
            setCellValue(sheetIndex, 13, workbook, dataRow, data.get("secondary_operator"));
            setCellValue(sheetIndex, 14, workbook, dataRow, data.get("primary_outsourced_operator"));
            setCellValue(sheetIndex, 15, workbook, dataRow, data.get("secondary_outsourced_operator"));
            setCellValue(sheetIndex, 16, workbook, dataRow, data.get("operating_status"));
            setCellValue(sheetIndex, 17, workbook, dataRow, data.get("eol_status"));
            setCellValue(sheetIndex, 18, workbook, dataRow, data.get("eos_status"));
            setCellValue(sheetIndex, 19, workbook, dataRow, data.get("redundancy_config"));
            setCellValue(sheetIndex, 20, workbook, dataRow, data.get("network_operation_type"));
            setCellValue(sheetIndex, 21, workbook, dataRow, data.get("asset_acquisition_date"));
            setCellValue(sheetIndex, 22, workbook, dataRow, data.get("asset_disposal_date"));
            setCellValue(sheetIndex, 23, workbook, dataRow, data.get("acquisition_cost"));
            setCellValue(sheetIndex, 24, workbook, dataRow, data.get("dbrain_number"));
            setCellValue(sheetIndex, 25, workbook, dataRow, data.get("domestic"));
            setCellValue(sheetIndex, 26, workbook, dataRow, data.get("unit_position"));
            setCellValue(sheetIndex, 27, workbook, dataRow, data.get("installation_coordinates"));
            setCellValue(sheetIndex, 28, workbook, dataRow, data.get("installation_units"));
            setCellValue(sheetIndex, 29, workbook, dataRow, data.get("equipment_size_units"));
            setCellValue(sheetIndex, 30, workbook, dataRow, data.get("maintenance_contract_target"));
            setCellValue(sheetIndex, 31, workbook, dataRow, data.get("cpu"));
            setCellValue(sheetIndex, 32, workbook, dataRow, data.get("mem"));
            setCellValue(sheetIndex, 33, workbook, dataRow, data.get("disk"));
            setCellValue(sheetIndex, 34, workbook, dataRow, data.get("serial_number"));
            setCellValue(sheetIndex, 35, workbook, dataRow, data.get("created_at"));
        }
        else{
            setCellValue(sheetIndex, 0,  workbook, dataRow, data.get("eqp_manage_id"));
            setCellValue(sheetIndex, 1,  workbook, dataRow, data.get("host"));
            setCellValue(sheetIndex, 2,  workbook, dataRow, data.get("ip_address"));
            setCellValue(sheetIndex, 3,  workbook, dataRow, data.get("port"));
        }

    }

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 데이터 저장
     *
     * @param file 업로드된 엑셀 파일
     * @return 삽입 결과
     * @throws IOException 입력/출력 예외
     */
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

                // 장비 기본정보 상세정보 연결정보 3개로 변경해야함!!
                // eqpMapper.insertEqpList(insertExcelMap);
                successList.add(insertExcelMap);

            } catch (Exception e) {
                failList.add(insertExcelMap);
            }
        }

        returnMap.put("successList", successList);
        returnMap.put("failList", failList);

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 데이터 저장 후 결과파일 생성
     *
     * @param paramMap 저장결과 파라미터 맵
     * @return 엑셀 워크북 객체
     * @throws IOException 입력/출력 예외
     */
    public Workbook saveResultEquipment(Map<String, Object> paramMap) throws IOException {
        String resultPath = staticPath + "equipmentResultTemplate.xlsx";
        FileInputStream file = new FileInputStream(resultPath);
        Workbook wb = new XSSFWorkbook(file);

        // 결과파일 생성 시 데이터 받아와서 엑셀 생성
        // 장비추가/수정/상세/삭제 기능 개발 완료 후 개발
        return wb;
    }

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 업로드 양식 엑셀 파일 생성
     *
     * @return 엑셀 워크북 객체
     * @throws IOException 입력/출력 예외
     */
    public Workbook excelTemplate() throws IOException {
        String uploadPath = staticPath + "equipmentUploadTemplate.xlsx";
        FileInputStream file = new FileInputStream(uploadPath);
        return new XSSFWorkbook(file);
    }

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 엑셀 업로드 파일 유효성 검증
     *
     * @param file 업로드된 엑셀 파일
     * @return 엑셀 워크북 객체
     * @throws IOException 입력/출력 예외
     */
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

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 검증용 메서드1 : 문자/숫자 셀 형식 찾기
     *
     * @param cellHeader 셀 헤더
     * @param cellValue 셀 값
     * @return 처리된 셀 데이터와 관련된 맵
     */
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

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 검증용 메서드2 : 숫자만 들어가야 하는 컬럼들
     *
     * @param cellHeaderStr 셀 헤더 문자열
     * @return 셀이 숫자여야 하는 경우 true, 그렇지 않으면 false
     */
    private boolean isNumericColumn(String cellHeaderStr) {
        return cellHeaderStr.equals("acquisition_cost")
                || cellHeaderStr.equals("dbrain_number")
                || cellHeaderStr.equals("installation_units")
                || cellHeaderStr.equals("equipment_size_units");
    }

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 검증용 메서드3 : 셀이 숫자여야 할 때
     *
     * @param cellHeaderStr 셀 헤더 문자열
     * @param cellValue 셀 값
     * @param processMap 처리된 셀 데이터와 관련된 맵
     */
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

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 검증용 메서드4 : 셀이 문자여야 할 때
     *
     * @param cellHeaderStr 셀 헤더 문자열
     * @param cellValue 셀 값
     * @param processMap 처리된 셀 데이터와 관련된 맵
     */
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

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 검증용 메서드5 : 셀이 비었을 때 처리
     *
     * @param cellHeaderStr 셀 헤더 문자열
     * @param processMap 처리된 셀 데이터와 관련된 맵
     */
    private void processEmptyCell(String cellHeaderStr, Map<String, Object> processMap) {
        if (isNumericColumn(cellHeaderStr)) {
            processMap.put(cellHeaderStr, 0);
        } else {
            processMap.put(cellHeaderStr, "");
        }
    }

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 검증용 메서드6 : workbook 시트에 셀 값 지정
     *
     * @param workbook 엑셀 워크북 객체
     * @param sheetIndex 시트 인덱스
     * @param data 셀에 입력할 데이터 맵
     */
    private void validDataToSheet(Workbook workbook, int sheetIndex, Map<String, Object> data) {
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

    /**
     * 장비관리 > 장비목록 > 장비 업로드 > 검증용 메서드7 : 문자인지 숫자인지 구분해서 셀 값 지정
     *
     * @param sheetIndex 시트 인덱스
     * @param cellIndex 셀 인덱스
     * @param workbook 엑셀 워크북 객체
     * @param dataRow 데이터 행
     * @param value 셀에 입력할 값
     */
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

    /**
     * 장비관리 > 장비목록 > 추가/수정/상세 > 장비분류 선택박스 : 구성분류 데이터 가져오기
     *
     * @return 구성분류 데이터
     */
    public Map<String, Object> getSelectConfigData(){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            returnMap.put("selectData", eqpMapper.getSelectConfigData());
            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 추가/수정/상세 > 장비분류 선택박스 : 자산분류 데이터 가져오기
     *
     * @return 자산분류 데이터
     */
    public Map<String, Object> getSelectAssetData(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            returnMap.put("selectData", eqpMapper.getSelectAssetData(paramMap));
            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 추가/수정/상세 > 장비분류 선택박스 : 자산세부 데이터 가져오기
     *
     * @return 자산세부 데이터
     */
    public Map<String, Object> getSelectSubData(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            returnMap.put("selectData", eqpMapper.getSelectSubData(paramMap));
            returnMap.put("errorCode",true);

        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 추가/수정/상세 > 장비분류 선택박스 : 자산상세 데이터 가져오기
     *
     * @return 자산상세 데이터
     */
    public Map<String, Object> getSelectDetailData(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            returnMap.put("selectData", eqpMapper.getSelectDetailData(paramMap));
            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 추가 > 장비 저장 (기본정보, 세부정보, 연결정보)
     *
     * @param paramMap 저장할 장비 데이터
     * @return 저장 결과
     */
    @SuppressWarnings("unchecked")
    @Transactional
    public Map<String, Object> insertEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            String eqp_manage_id = eqpMapper.generateEqpManageId(paramMap);
            paramMap.put("eqp_manage_id", eqp_manage_id); // 장비 관리번호 생성

            eqpMapper.insertEquipmentBasic(paramMap); // 장비 기본정보 저장
            eqpMapper.insertEquipmentDetail(paramMap); // 장비 세부정보 저장

            List<Map<String, Object>> eqpLink = (List<Map<String, Object>>) paramMap.get("eqpLink");
            if (eqpLink != null) {
                for (Map<String, Object> link : eqpLink) {
                    link.put("eqp_manage_id", eqp_manage_id);
                    eqpMapper.insertEquipmentLink(link); // 장비 연결정보 저장
                }
            }

            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 수정/상세 > 장비연결정보 데이터 가져오기
     *
     * @return 장비 연결정보 리스트
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getEqpLinkList(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {

            if (paramMap.containsKey("searchData")) {
                paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
            }

            List<Map<String, Object>> rows = eqpMapper.getEquipmentDetailLinkList(paramMap);
            int total = eqpMapper.getEquipmentDetailLinkListCnt(paramMap);

            returnMap.put("rows", rows);
            returnMap.put("total", total);
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 수정 > 선택한 장비 정보 리스트 수정 (기본정보, 세부정보, 연결정보)
     *
     * @param paramMap 수정할 장비 데이터
     * @return 수정 결과
     */
    @SuppressWarnings("unchecked")
    @Transactional
    public Map<String, Object> updateEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            eqpMapper.updateBasicEqpList(paramMap);
            eqpMapper.updateDetailEqpList(paramMap);

            List<Map<String, Object>> eqpLinkAdd = (List<Map<String, Object>>) paramMap.get("eqpLinkAdd");
            List<Map<String, Object>> eqpLinkUpdate = (List<Map<String, Object>>) paramMap.get("eqpLinkUpdate");
            List<Map<String, Object>> eqpLinkDelete = (List<Map<String, Object>>) paramMap.get("eqpLinkDelete");

            if(eqpLinkAdd != null) {
                for(Map<String, Object> link : eqpLinkAdd) {
                    link.put("eqp_manage_id", paramMap.get("eqp_manage_id"));
                    eqpMapper.insertEquipmentLink(link);
                }
            }
            if(eqpLinkUpdate != null) {
                for(Map<String, Object> link : eqpLinkUpdate) {
                    link.put("eqp_manage_id", paramMap.get("eqp_manage_id"));
                    eqpMapper.updateEquipmentLink(link);
                }
            }
            if(eqpLinkDelete != null) {
                for(Map<String, Object> link : eqpLinkDelete) {
                    link.put("eqp_manage_id", paramMap.get("eqp_manage_id"));
                    eqpMapper.deleteEquipmentLink(link);
                }
            }

            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 상세 > 선택한 장비 정보 리스트 (기본정보, 세부정보, 연결정보)
     *
     * @param eqp_manage_id 장비 관리번호
     * @return 장비 정보 리스트
     */
    public Map<String, Object> getEquipmentDetailTotalList(String eqp_manage_id){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            Map<String, Object> selectData = eqpMapper.getEquipmentDetailTotalList(eqp_manage_id); // 장비 정보
            selectData.putAll(eqpMapper.getEquipmentDetailAssetList(selectData)); // 선택한 장비 분류 카테고리(구성분류, 자산분류, 자산세부분류, 자산상세분류)

            returnMap.put("selectData", selectData);
            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * 장비관리 > 장비목록 > 수정 > 선택한 장비 정보 리스트 (기본정보, 세부정보, 연결정보)
     *
     * @param eqp_manage_id 장비 관리번호
     * @return 장비 정보 리스트
     */
    public Map<String, Object> getEquipmentUpdateTotalList(String eqp_manage_id){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            Map<String, Object> selectData = eqpMapper.getEquipmentDetailTotalList(eqp_manage_id); // 장비 정보
            List<Map<String, Object>> config_category = eqpMapper.getSelectConfigData();           // 장비분류 : 구성분류
            List<Map<String, Object>> asset_category  = eqpMapper.getSelectAssetData(selectData);  // 장비분류 : 자산분류
            List<Map<String, Object>> sub_category    = eqpMapper.getSelectSubData(selectData);    // 장비분류 : 자산세부분류
            List<Map<String, Object>> detail_category = eqpMapper.getSelectDetailData(selectData); // 장비분류 : 자산상세분류

            returnMap.put("selectData", selectData);
            returnMap.put("config_category", config_category);
            returnMap.put("asset_category",  asset_category);
            returnMap.put("sub_category",    sub_category);
            returnMap.put("detail_category", detail_category);

            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }
    
    /**
     * 장비관리 > 장비목록 > 삭제 > 선택한 장비 정보 리스트 삭제 (기본정보, 세부정보, 연결정보)
     *
     * @param deleteList 삭제할 장비 데이터
     * @return 삭제 결과
     */
    @Transactional
    public Map<String, Object> deleteEqpList(List<Map<String, Object>> deleteList) {

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            for(Map<String, Object> ele : deleteList){
                String deleteEqpTarget = ele.get("eqp_manage_id").toString();
                eqpMapper.deleteEqpList(deleteEqpTarget);
            }

            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }

}
