package sl.qr.mh.service.rack.line;

import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sl.qr.mh.service.common.qrMakeService;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class lineManageService {

	private final lineMapper lineMapper;
	private final qrMakeService qrMakeService;

	public lineManageService(lineMapper lineMapper, qrMakeService qrMakeService) {
		this.lineMapper = lineMapper;
		this.qrMakeService = qrMakeService;
	}

	/**
	 * 선번장관리 > 선번장목록 > 선번장 목록 데이터
	 *
	 * @param paramMap 요청 파라미터 맵
	 * @return 선번장 목록 데이터 및 기타 메타 정보
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getLineList(Map<String, Object> paramMap){

		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try {
			if (paramMap.containsKey("searchData")) {
				paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
			}

			List<Map<String, Object>> rows = lineMapper.getLineTotalList(paramMap);
			int total = lineMapper.getLineTotalListCnt(paramMap);

			returnMap.put("rows", rows);
			returnMap.put("total", total);
			returnMap.put("pageSize", paramMap.getOrDefault("pageSize", 10));  // 기본값으로 10 설정
			returnMap.put("pageNumber", paramMap.getOrDefault("pageNumber", 1)); // 기본값으로 1 설정
			returnMap.put("errorCode", true);

		} catch (Exception e) {
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 추가/수정 > 출발지 장비 리스트
	 *
	 * @return 장비 리스트
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getLineStartEquipmentList(Map<String, Object> paramMap){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			if (paramMap.containsKey("searchData")) {
				paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
			}

			List<Map<String, Object>> rows = lineMapper.getLineStartEquipmentList(paramMap);
			int total = lineMapper.getLineStartEquipmentListCnt(paramMap);

			returnMap.put("rows", rows);
			returnMap.put("total", total);
			returnMap.put("pageSize", paramMap.getOrDefault("pageSize", 10));  // 기본값으로 10 설정
			returnMap.put("pageNumber", paramMap.getOrDefault("pageNumber", 1)); // 기본값으로 1 설정
			returnMap.put("errorCode", true);

		} catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 추가/수정 > 목적지 장비 리스트
	 *
	 * @return 장비 리스트
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getLineEndEquipmentList(Map<String, Object> paramMap){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			if (paramMap.containsKey("searchData")) {
				paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
			}

			List<Map<String, Object>> rows = lineMapper.getLineEndEquipmentList(paramMap);
			int total = lineMapper.getLineEndEquipmentListCnt(paramMap);

			returnMap.put("rows", rows);
			returnMap.put("total", total);
			returnMap.put("pageSize", paramMap.getOrDefault("pageSize", 10));  // 기본값으로 10 설정
			returnMap.put("pageNumber", paramMap.getOrDefault("pageNumber", 1)); // 기본값으로 1 설정
			returnMap.put("errorCode", true);

		} catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}


	/**
	 * 선번장관리 > 선번장목록 > 추가/수정 > 회선정보 리스트
	 *
	 * @return 회선정보 리스트
	 */
	public Map<String, Object> getLineLinkList(){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			Map<String, Object> paramMap = new HashMap<>();

			paramMap.put("lineCategory", "1");
			List<Map<String, Object>> category = lineMapper.getLineLinkList(paramMap);
			paramMap.put("lineCategory", "2");
			List<Map<String, Object>> speed    = lineMapper.getLineLinkList(paramMap);
			paramMap.put("lineCategory", "3");
			List<Map<String, Object>> color    = lineMapper.getLineLinkList(paramMap);

			returnMap.put("category", category);
			returnMap.put("speed", speed);
			returnMap.put("color", color);

			returnMap.put("errorCode", true);
		} catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 추가 > 저장
	 *
	 * @return 저장결과
	 */
	public Map<String, Object> saveLineInfo(Map<String, Object> paramMap){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);
		try{
			int isContain = lineMapper.checkInsertListToContainLine(paramMap);
			if (isContain == 0) {
				String lineManageId = paramMap.get("line_installation_year").toString();
				paramMap.put("lineManageId", lineManageId.replaceAll("-", ""));

				lineManageId = lineMapper.generateLineManageId(paramMap);
				paramMap.put("lineManageId", lineManageId);

				// 인코딩 테스트
				// System.out.println("cableManageId:" + cableManageId);
				// SecretKey key = AESUtil.generateKey();
				// String encryptedTarget = AESUtil.encryptWithSafeFileName(cableManageId, key);
				// paramMap.put("encryptedTarget", encryptedTarget);
				// System.out.println("encryptedTarget:" + encryptedTarget);
				// String decryptTest = AESUtil.decryptFromSafeFileName(encryptedTarget, key);
				// System.out.println("decryptTest:" + decryptTest);

				String filePath = qrMakeService.QRMake(lineManageId);
				paramMap.put("qrImageLocation", filePath);
				lineMapper.saveLineInfo(paramMap);

			}
			returnMap.put("isContain", isContain);
			returnMap.put("errorCode", true);
		} catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 상세 > 선택한 선번장 정보 (포설년도, 회선정보)
	 *
	 * @param lineManageId 선번장 관리번호
	 * @return 선번장 정보
	 */
	public Map<String, Object> getEquipmentDetailTotalList(String lineManageId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			Map<String, Object> LineMap = lineMapper.getLineDetailLinkList(lineManageId);

			returnMap.put("selectData", LineMap);
			returnMap.put("errorCode", true);
		}catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 수정 > 선택한 선번장 정보 (포설년도, 회선정보)
	 *
	 * @param lineManageId 선번장 관리번호
	 * @return 선번장 정보
	 */
	public Map<String, Object> getEquipmentUpdateTotalList(String lineManageId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			Map<String, Object> LineMap = lineMapper.getLineDetailLinkList(lineManageId); // 선택된 출발지, 목적지
			returnMap.put("selectData", LineMap);
			returnMap.put("errorCode", true);
		}catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 수정/상세 > 선택된 선번장 구성 데이터 (출발지, 목적지)
	 *
	 * @return 선번장 구성 데이터
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> getLineDetailInfo(Map<String, Object> paramMap){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			if (paramMap.containsKey("searchData")) {
				paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
			}

			returnMap.put("rows", lineMapper.getLineDetailTotalList(paramMap));
			returnMap.put("errorCode", true);
		}catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 수정 > 저장
	 *
	 * @return 저장결과
	 */
	public Map<String, Object> updateLineInfo(Map<String, Object> paramMap){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);
		try{
			lineMapper.updateLineInfo(paramMap);
			returnMap.put("errorCode", true);
		} catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}

	
	/**
	 * 선번장관리 > 선번장목록 > 삭제 > 선택한 선번장 정보 리스트 삭제
	 *
	 * @param deleteList 삭제할 장비 데이터
	 * @return 삭제 결과
	 */
	@Transactional
	public Map<String, Object> deleteLineList(List<Map<String, Object>> deleteList) {

		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode",false);

		try {
			for(Map<String, Object> ele : deleteList){
				String deleteLineTarget = ele.get("line_manage_id").toString();
				lineMapper.deleteLineList(deleteLineTarget);
			}

			returnMap.put("errorCode",true);

		} catch (Exception e) {
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 선번장 목록 다운로드
	 */
	private final String sep = File.separator;
	private final String staticPath = System.getProperty("user.dir") + sep + "src" + sep + "main" + sep + "resources" + sep + "static";

	@Transactional
	public Workbook downloadLineList() throws IOException {
		String resultPath = staticPath + sep + "excelTemplate" + sep + "lineListTemplate.xlsx";
		FileInputStream file = new FileInputStream(resultPath);
		Workbook wb = new XSSFWorkbook(file);

		try {
			int sheetIndex = 0;

			List<Map<String, Object>> lineTotalList = lineMapper.getExcelLineTotalList();
			for(Map<String, Object> ele : lineTotalList) {
				insertDataToSheet(wb, sheetIndex, ele);
			}

			sheetIndex = 1;
			for(Map<String, Object> ele : lineTotalList) {
				insertDataToSheet(wb, sheetIndex, ele);
			}

		} catch (Exception e){
			log.error(e.getMessage());
		}

		return wb;
	}

	/**
	 * 선번장관리 > 선번장목록 > 선번장 목록 다운로드 : 엑셀 시트에 선번장 목록 데이터 입력
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
			/* 출발지 */
			setCellValue(sheetIndex, 1,   workbook, dataRow, data.get("s_asset_category"));				// 자산분류
			setCellValue(sheetIndex, 2,   workbook, dataRow, data.get("s_installation_coordinates"));		// 설치좌표
			setCellValue(sheetIndex, 3,   workbook, dataRow, data.get("s_eqp_manage_id"));					// 관리ID
			setCellValue(sheetIndex, 4,   workbook, dataRow, data.get("s_m_company"));						// 제조사
			setCellValue(sheetIndex, 5,   workbook, dataRow, data.get("s_model_name"));					// 모델명
			setCellValue(sheetIndex, 6,   workbook, dataRow, data.get("s_host_name"));						// 호스트명
			setCellValue(sheetIndex, 7,   workbook, dataRow, data.get("s_eqp_name")); 						// 구성자원명
			setCellValue(sheetIndex, 8,   workbook, dataRow, data.get("s_port")); 							// 포트번호
			setCellValue(sheetIndex, 9,   workbook, dataRow, data.get("s_primary_operator"));				// 운영담당자
			setCellValue(sheetIndex, 10,  workbook, dataRow, data.get("s_primary_outsourced_operator"));	// 위탁운영담당자

			/* 목적지 */
			setCellValue(sheetIndex, 11,  workbook, dataRow, data.get("e_asset_category"));                // 자산분류
			setCellValue(sheetIndex, 12,  workbook, dataRow, data.get("e_installation_coordinates"));      // 설치좌표
			setCellValue(sheetIndex, 13,  workbook, dataRow, data.get("e_eqp_manage_id"));                 // 관리ID
			setCellValue(sheetIndex, 14,  workbook, dataRow, data.get("e_m_company"));                     // 제조사
			setCellValue(sheetIndex, 15,  workbook, dataRow, data.get("e_model_name"));                    // 모델명
			setCellValue(sheetIndex, 16,  workbook, dataRow, data.get("e_host_name"));                     // 호스트명
			setCellValue(sheetIndex, 17,  workbook, dataRow, data.get("e_eqp_name"));                      // 구성자원명
			setCellValue(sheetIndex, 18,  workbook, dataRow, data.get("e_port"));                          // 포트번호
			setCellValue(sheetIndex, 19,  workbook, dataRow, data.get("e_primary_operator"));              // 운영담당자
			setCellValue(sheetIndex, 20,  workbook, dataRow, data.get("e_primary_outsourced_operator"));   // 위탁운영담당자

			/* 회선 */
			setCellValue(sheetIndex, 21,  workbook, dataRow, data.get("line_category"));               // 속도
			setCellValue(sheetIndex, 22,  workbook, dataRow, data.get("line_speed"));                  // 선구분
			setCellValue(sheetIndex, 23,  workbook, dataRow, data.get("line_color"));                  // 선색상
		}
		else{
            /* 출발지 */
            String start =
					"[" + data.get("s_installation_coordinates").toString() + "]" +
                    "-" + data.get("s_eqp_manage_id").toString() +
					"-" + data.get("s_port").toString();

			setCellValue(sheetIndex, 1,  workbook, dataRow, start);       // 출발지

			/* 목적지 */
            String end =
					"[" + data.get("e_installation_coordinates").toString() + "]" +
                    "-" + data.get("e_eqp_manage_id").toString() +
                    "-" + data.get("e_port").toString();

			setCellValue(sheetIndex, 2,  workbook, dataRow, end);       // 파일명

			/* 이미지 */
			String imageLocation = staticPath + data.get("qr_image_location").toString();
			setCellValue(sheetIndex, 3,  workbook, dataRow, imageLocation);       // 파일명
		}
	}

	/**
	 * 선번장관리 > 선번장목록 > 선번장 목록 다운로드 > 검증용 메서드 : 문자인지 숫자인지 구분해서 셀 값 지정
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
	}
}
