package sl.qr.mh.service.cable;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
}
