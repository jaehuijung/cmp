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

    public Map<String ,Object> getChartData(){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            List<Map<String, Object>> fiberCableData = dashboardMapper.getFiberCableData(); // 광 케이블 상세
            List<Map<String, Object>> utpCableData = dashboardMapper.getUtpCableData();     // UTP 케이블 상세
            List<Map<String, Object>> hardwareData = dashboardMapper.getHardwareData();     // 장비 등록 상세
            List<Map<String, Object>> softwareData = dashboardMapper.getSoftwareData();     // 소프트웨어 등록 상세

            returnMap.put("fiberCableData", fiberCableData);
            returnMap.put("utpCableData", utpCableData);
            returnMap.put("hardwareData", hardwareData);
            returnMap.put("softwareData", softwareData);
            returnMap.put("errorCode", true);
        }
        catch (Exception e){
            log.error(e.getMessage());
            throw e;
        }

        return returnMap;
    }

}
