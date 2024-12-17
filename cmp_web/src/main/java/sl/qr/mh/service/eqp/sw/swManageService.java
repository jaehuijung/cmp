package sl.qr.mh.service.eqp.sw;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sl.qr.mh.service.eqp.hw.hwMapper;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * S/W관리 > S/W목록
 */
@Slf4j
@Service
public class swManageService {

    private final hwMapper hwMapper;
    private final swMapper swMapper;
    private final String sep = File.separator;
    // private final String staticPath = System.getProperty("user.dir") + sep + "src" + sep + "main" + sep + "resources" + sep + "static" + sep + "excelTemplate" + sep;
    private final String staticPath = System.getProperty("user.dir") + sep + "excelTemplate" + sep;

    public swManageService(hwMapper hwMapper, swMapper swMapper) {
        this.hwMapper = hwMapper;
        this.swMapper = swMapper;
    }

    /**
     * S/W관리 > 장비목록 > 장비 목록 데이터
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

            List<Map<String, Object>> rows = swMapper.getEquipmentTotalList(paramMap);
            int total = swMapper.getEquipmentTotalListCnt(paramMap);

            returnMap.put("rows", rows);
            returnMap.put("total", total);
            returnMap.put("pageSize", paramMap.getOrDefault("pageSize", 10));  // 기본값으로 10 설정
            returnMap.put("pageNumber", paramMap.getOrDefault("pageNumber", 1)); // 기본값으로 1 설정
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * S/W관리 > 장비목록 > 추가 > 장비 저장 : 기본정보, 세부정보
     *
     * @param paramMap 저장할 장비 데이터
     * @return 저장 결과
     */
    @Transactional
    public Map<String, Object> insertEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            String eqp_manage_id = swMapper.generateEquipmentManageId(paramMap);
            paramMap.put("eqp_manage_id", eqp_manage_id); // 장비 관리번호 생성

            swMapper.insertEquipmentBasic(paramMap);  // 장비 기본정보 저장
            swMapper.insertEquipmentDetail(paramMap); // 장비 세부정보 저장
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }

        return returnMap;
    }



    /**
     * S/W관리 > 장비목록 > 상세 > 선택한 장비 정보 : 기본정보, 세부정보
     *
     * @param eqp_manage_id 장비 관리번호
     * @return 장비 정보 리스트
     */
    public Map<String, Object> getEquipmentDetailTotalList(String eqp_manage_id){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            Map<String, Object> selectData = swMapper.getEquipmentDetailTotalList(eqp_manage_id); // 장비 정보
            selectData.putAll(swMapper.getEquipmentDetailAssetList(selectData)); // 선택한 장비 분류 카테고리(구성분류, 자산분류, 자산세부분류, 자산상세분류)

            returnMap.put("selectData", selectData);
            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> getEquipmentDetailHardwareConnectList(Map<String, Object> paramMap){

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            if (paramMap.containsKey("searchData")) {
                paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
            }

            List<Map<String, Object>> rows = swMapper.getEquipmentDetailHardwareConnectList(paramMap);
            int total = 1;

            returnMap.put("rows", rows);
            returnMap.put("total", total);
            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * S/W관리 > 장비목록 > 수정 > 선택한 장비 정보 : 기본정보, 세부정보
     *
     * @param eqp_manage_id 장비 관리번호
     * @return 장비 정보 리스트
     */
    public Map<String, Object> getEquipmentUpdateTotalList(String eqp_manage_id){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            Map<String, Object> selectData = swMapper.getEquipmentDetailTotalList(eqp_manage_id); // 장비 정보
            List<Map<String, Object>> config_category = hwMapper.getSelectConfigData();           // 장비분류 : 구성분류
            List<Map<String, Object>> asset_category  = hwMapper.getSelectAssetData(selectData);  // 장비분류 : 자산분류
            List<Map<String, Object>> sub_category    = hwMapper.getSelectSubData(selectData);    // 장비분류 : 자산세부분류
            List<Map<String, Object>> detail_category = hwMapper.getSelectDetailData(selectData); // 장비분류 : 자산상세분류

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
     * S/W관리 > 장비목록 > 수정 > 선택한 장비 정보 수정 : 기본정보, 세부정보
     *
     * @param paramMap 수정할 장비 데이터
     * @return 수정 결과
     */
    @Transactional
    public Map<String, Object> updateEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            swMapper.updateBasicEqpList(paramMap);
            swMapper.updateDetailEqpList(paramMap);

            returnMap.put("errorCode",true);
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }


    /**
     * S/W관리 > 장비목록 > 삭제 > 선택한 장비 정보 삭제 : 기본정보, 세부정보
     *
     * @param deleteList 삭제할 장비 데이터
     * @return 삭제 결과
     */
    @Transactional
    public Map<String, Object> deleteEqpList(List<Map<String, Object>> deleteList) {

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            List<String> errorTarget = new ArrayList<>();
            for(Map<String, Object> ele : deleteList){
                String deleteEqpTarget = ele.get("eqp_manage_id").toString();
                swMapper.deleteEqpList(deleteEqpTarget);
            }

            returnMap.put("errorTarget", errorTarget);
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }


    /**
     * S/W관리 > 장비목록 > 장비 목록 다운로드 > 장비목록 전체 리스트
     *
     * @return 장비 목록 데이터
     */
    @Transactional
    public Workbook excelDownloadEquipmentList() throws IOException {
        String resultPath = staticPath + "equipmentSWListTemplate.xlsx";
        FileInputStream file = new FileInputStream(resultPath);
        Workbook wb = new XSSFWorkbook(file);

        try {
            int sheetIndex = 0;

            List<Map<String, Object>> equipmentDetailTotalList = swMapper.getExcelEquipmentTotalList();
            for(Map<String, Object> ele : equipmentDetailTotalList) {
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
     * S/W관리 > 장비목록 > 장비 목록 다운로드 : 엑셀 시트에 장비목록 데이터 입력
     *
     * @param workbook 엑셀 워크북 객체
     * @param sheetIndex 시트 인덱스
     * @param data 셀에 입력할 데이터 맵
     */
    private void insertDataToSheet(Workbook workbook, int sheetIndex, Map<String, Object> data) {

        Sheet sheet = workbook.getSheetAt(sheetIndex);
        int lastRowNum = sheet.getLastRowNum();

        Row dataRow = sheet.createRow(lastRowNum + 1);

        // S/W 장비 기본정보, 상세정보
        setCellValue(sheetIndex, 0,  workbook, dataRow, data.get("eqp_manage_id")); // 관리번호
        setCellValue(sheetIndex, 1,  workbook, dataRow, data.get("eqp_name")); // 구성자원명
        setCellValue(sheetIndex, 2,  workbook, dataRow, data.get("host_name")); // 호스트명
        setCellValue(sheetIndex, 3,  workbook, dataRow, data.get("m_company")); // 제조사
        setCellValue(sheetIndex, 4,  workbook, dataRow, data.get("model_name")); // 모델명
        setCellValue(sheetIndex, 5,  workbook, dataRow, data.get("config_category")); // 구성분류
        setCellValue(sheetIndex, 6,  workbook, dataRow, data.get("asset_category")); // 자산분류
        setCellValue(sheetIndex, 7,  workbook, dataRow, data.get("sub_category")); // 자산세부분류
        setCellValue(sheetIndex, 8,  workbook, dataRow, data.get("detail_category")); // 자산상세분류
        setCellValue(sheetIndex, 9,  workbook, dataRow, data.get("detail_category")); // 자산상세분류
        setCellValue(sheetIndex, 10, workbook, dataRow, data.get("os_version")); // OS VERSION
        setCellValue(sheetIndex, 11, workbook, dataRow, data.get("operating_department")); // 운영부서
        setCellValue(sheetIndex, 12, workbook, dataRow, data.get("primary_operator")); // 운영담당자 정
        setCellValue(sheetIndex, 13, workbook, dataRow, data.get("secondary_operator")); // 운영담당자 부
        setCellValue(sheetIndex, 14, workbook, dataRow, data.get("primary_outsourced_operator")); // 위탁운영담당자 정
        setCellValue(sheetIndex, 15, workbook, dataRow, data.get("secondary_outsourced_operator")); // 위탁운영담당자 부
        setCellValue(sheetIndex, 16, workbook, dataRow, data.get("operating_status")); // 운영상태
        setCellValue(sheetIndex, 17, workbook, dataRow, data.get("eol_status")); // 단종상태 EOL
        setCellValue(sheetIndex, 18, workbook, dataRow, data.get("eos_status")); // 단종상태 EOS
        setCellValue(sheetIndex, 19, workbook, dataRow, data.get("network_operation_type")); // 네트워크 운영구분
        setCellValue(sheetIndex, 20, workbook, dataRow, data.get("asset_acquisition_date")); // 자산취득일자
        setCellValue(sheetIndex, 21, workbook, dataRow, data.get("asset_disposal_date")); // 자산폐기일자
        setCellValue(sheetIndex, 22, workbook, dataRow, data.get("acquisition_cost")); // 도입금액
        setCellValue(sheetIndex, 23, workbook, dataRow, data.get("dbrain_number")); // 디브레인번호
        setCellValue(sheetIndex, 24, workbook, dataRow, data.get("domestic")); // 국산여부
        setCellValue(sheetIndex, 25, workbook, dataRow, data.get("maintenance_contract_target")); // 유지관리 계약대상 여부
        setCellValue(sheetIndex, 26, workbook, dataRow, data.get("amount")); // 수량
        setCellValue(sheetIndex, 27, workbook, dataRow, data.get("license_number")); // 라이센스 번호
        setCellValue(sheetIndex, 28, workbook, dataRow, data.get("created_at")); // 생성일
    }

    /**
     * S/W관리 > 장비목록 > 장비 목록 업로드 > 검증용 메서드7 : 문자인지 숫자인지 구분해서 셀 값 지정
     *
     * @param cellIndex 셀 인덱스
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
    }

}
