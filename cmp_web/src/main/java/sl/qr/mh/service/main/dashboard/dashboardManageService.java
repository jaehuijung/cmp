package sl.qr.mh.service.main.dashboard;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 메인 > 대시보드
 */
@Slf4j
@Service
public class dashboardManageService {

    private final dashboardMapper dashboardMapper;

    public dashboardManageService(dashboardMapper dashboardMapper) {
        this.dashboardMapper = dashboardMapper;
    }

    public Map<String ,Object> getCableDetailData(){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            List<Map<String, Object>> cableDetailData = dashboardMapper.getCableDetailData();
            returnMap.put("cableDetailData", cableDetailData);
            returnMap.put("errorCode", true);
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw e;
        }

        return returnMap;
    }

}
