package sl.qr.mh.service.cable;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sl.qr.mh.service.common.AESUtil;
import sl.qr.mh.service.common.qrMakeService;

import javax.crypto.SecretKey;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class cableManageService {

	private final cableMapper cableMapper;
	private final qrMakeService qrMakeService;

	public cableManageService(cableMapper cableMapper, qrMakeService qrMakeService) {
		this.cableMapper = cableMapper;
		this.qrMakeService = qrMakeService;
	}

	/**
	 * 선번장관리 > 선번장목록 > 선번장 목록 데이터
	 *
	 * @param paramMap 요청 파라미터 맵
	 * @return 선번장 목록 데이터 및 기타 메타 정보
	 */
	public Map<String, Object> getCableList(Map<String, Object> paramMap){

		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try {

			List<Map<String, Object>> rows = cableMapper.getCableTotalList(paramMap);
			int total = cableMapper.getCableTotalListCnt(paramMap);

			returnMap.put("rows", rows);
			returnMap.put("total", total);
			returnMap.put("errorCode", true);

		} catch (Exception e) {
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 추가/수정 > 출발지, 목적지 장비 리스트
	 *
	 * @return 장비 리스트
	 */
	public Map<String, Object> getRackEquipmentList(Map<String, Object> paramMap){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			List<Map<String, Object>> rows = cableMapper.getRackEquipmentList(paramMap);
			int total = cableMapper.getRackEquipmentListCnt(paramMap);

			returnMap.put("rows", rows);
			returnMap.put("total", total);
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
	public Map<String, Object> getRackLinkList(){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			Map<String, Object> paramMap = new HashMap<>();

			paramMap.put("lineCategory", "1");
			List<Map<String, Object>> category = cableMapper.getRackLinkList(paramMap);
			paramMap.put("lineCategory", "2");
			List<Map<String, Object>> speed    = cableMapper.getRackLinkList(paramMap);
			paramMap.put("lineCategory", "3");
			List<Map<String, Object>> color    = cableMapper.getRackLinkList(paramMap);

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
	public Map<String, Object> saveCableInfo(Map<String, Object> paramMap){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);
		try{
			int isContain = cableMapper.checkInsertListToContainCable(paramMap);
			if (isContain == 0) {
				String cableManageId = paramMap.get("cable_installation_year").toString();
				paramMap.put("cableManageId", cableManageId.replaceAll("-", ""));

				cableManageId = cableMapper.generateCableManageId(paramMap);
				paramMap.put("cableManageId", cableManageId);

				// 인코딩 테스트
				// System.out.println("cableManageId:" + cableManageId);
				// SecretKey key = AESUtil.generateKey();
				// String encryptedTarget = AESUtil.encryptWithSafeFileName(cableManageId, key);
				// paramMap.put("encryptedTarget", encryptedTarget);
				// System.out.println("encryptedTarget:" + encryptedTarget);
				// String decryptTest = AESUtil.decryptFromSafeFileName(encryptedTarget, key);
				// System.out.println("decryptTest:" + decryptTest);

				String filePath = qrMakeService.QRMake(cableManageId);
				paramMap.put("qrImageLocation", filePath);
				cableMapper.saveCableInfo(paramMap);

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
	 * @param cableManageId 선번장 관리번호
	 * @return 선번장 정보
	 */
	public Map<String, Object> getEquipmentDetailTotalList(String cableManageId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			Map<String, Object> rackMap = cableMapper.getCableDetailLinkList(cableManageId);

			returnMap.put("selectData", rackMap);
			returnMap.put("errorCode", true);
		}catch (Exception e){
			log.error(e.getMessage());
		}

		return returnMap;
	}

	/**
	 * 선번장관리 > 선번장목록 > 수정 > 선택한 선번장 정보 (포설년도, 회선정보)
	 *
	 * @param cableManageId 선번장 관리번호
	 * @return 선번장 정보
	 */
	public Map<String, Object> getEquipmentUpdateTotalList(String cableManageId){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			Map<String, Object> rackMap = cableMapper.getCableDetailLinkList(cableManageId); // 선택된 출발지, 목적지
			List<Map<String, Object>> link_category = cableMapper.getSelectLinkCategory();   // 회선구분
			List<Map<String, Object>> link_speed    = cableMapper.getSelectLinkSpeed();      // 회선속도
			List<Map<String, Object>> link_color    = cableMapper.getSelectLinkColor();      // 회선색상

			returnMap.put("selectData", rackMap);
			returnMap.put("link_category", link_category);
			returnMap.put("link_speed", link_speed);
			returnMap.put("link_color", link_color);

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
	public Map<String, Object> getCableDetailInfo(Map<String, Object> paramMap){
		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode", false);

		try{
			if (paramMap.containsKey("searchData")) {
				paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
			}

			returnMap.put("rows", cableMapper.getCableDetailTotalList(paramMap));
			returnMap.put("errorCode", true);
		}catch (Exception e){
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
	public Map<String, Object> deleteCableList(List<Map<String, Object>> deleteList) {

		Map<String, Object> returnMap = new HashMap<>();
		returnMap.put("errorCode",false);

		try {
			for(Map<String, Object> ele : deleteList){
				String deleteCableTarget = ele.get("cable_manage_id").toString();
				cableMapper.deleteCableList(deleteCableTarget);
			}

			returnMap.put("errorCode",true);

		} catch (Exception e) {
			log.error(e.getMessage());
		}

		return returnMap;
	}


}
