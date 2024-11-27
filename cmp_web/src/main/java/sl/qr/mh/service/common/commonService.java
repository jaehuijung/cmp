package sl.qr.mh.service.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class commonService {

    private final commonMapper commonMapper;

    public commonService(commonMapper commonMapper) {
        this.commonMapper = commonMapper;
    }


    @SuppressWarnings("unchecked")
    public Map<String, Object> getLineLinkList(){

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            List<Map<String, Object>> category = commonMapper.getLineLinkCategory();
            List<Map<String, Object>> speed    = commonMapper.getLineLinkSpeed();

            returnMap.put("category", category);
            returnMap.put("speed", speed);

            returnMap.put("errorCode", true);
        } catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }
}
