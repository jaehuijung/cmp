package sl.qr.mh.service.cable;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class cableManageService {


	private final cableMapper cableMapper;

	public cableManageService(cableMapper cableMapper) {
		this.cableMapper = cableMapper;
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
			String cableManageId = paramMap.get("cable_installation_year").toString();
			paramMap.put("cableManageId", cableManageId.replaceAll("-", ""));

			cableManageId = cableMapper.generateCableManageId(paramMap);
			paramMap.put("cableManageId", cableManageId);

			cableMapper.saveCableInfo(paramMap);
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


}
