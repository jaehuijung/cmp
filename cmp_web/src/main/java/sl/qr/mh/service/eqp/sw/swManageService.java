package sl.qr.mh.service.eqp.sw;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * S/W관리 > S/W목록
 */
@Slf4j
@Service
public class swManageService {


    private final swMapper swMapper;

    public swManageService(swMapper swMapper) {
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
    @SuppressWarnings("unchecked")
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

}
