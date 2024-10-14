package sl.qr.mh.service.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class userService {

    private final userMapper userMapper;

    public userService(userMapper userMapper){
        this.userMapper = userMapper;
    }

    public Map<String, Object> getAllUserList(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            List<Map<String, Object>> rows = userMapper.getAllUserList(paramMap);
            int total = userMapper.getAllUserListCnt(paramMap);

            returnMap.put("rows", rows);
            returnMap.put("total", total);
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

}
