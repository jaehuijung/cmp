// service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class EquipmentService {

    @Autowired
    private EqpMapper eqpMapper;

    @Transactional
    public Map<String, Object> insertEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try {
            // 1. 장비 기본정보 저장
            eqpMapper.insertEquipmentBasic(paramMap);

            // 장비 기본정보 저장 후 eqp_manage_id를 paramMap에서 가져옴
            String eqpManageId = (String) paramMap.get("eqp_manage_id");

            // 2. 세부정보 저장
            paramMap.put("eqp_manage_id", eqpManageId);
            eqpMapper.insertEquipmentDetail(paramMap);

            // 3. 연결정보 저장
            eqpMapper.insertEquipmentPort(paramMap);

            // 성공 시 errorCode를 true로 설정
            returnMap.put("errorCode", true);

        } catch (Exception e) {
            log.error("Error occurred while inserting equipment list: " + e.getMessage());
            // 트랜잭션 롤백은 @Transactional 어노테이션이 자동으로 수행함
        }

        return returnMap;
    }
}