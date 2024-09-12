package sl.qr.mh.service.eqp;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import sl.qr.mh.service.cableMapper;
import sl.qr.mh.vo.Equipment;

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
    public Map<String, Object> getEqpList(Map<String, Object> paramMap) {

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
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

    /************************************/
    // 아직 변경 안한놈들

    /*****************/
    // 과거 리스트... 나중에 지우기

}
