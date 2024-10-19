package sl.qr.mh.service.eqp.sw;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import sl.qr.mh.service.eqp.hw.hwMapper;

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
}
