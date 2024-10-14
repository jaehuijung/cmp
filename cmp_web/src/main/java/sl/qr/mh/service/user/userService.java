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

    // 사용자 정보 리스트
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

    // 사용자 정보 등록
    public Map<String, Object> saveUserInfo(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    // 사용자 상세 정보 리스트
    public Map<String, Object> detailUserInfo(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }


    // 사용자 정보 수정
    public Map<String, Object> updateUserInfo(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    // 사용자 정보 삭제
    public Map<String, Object> deleteUserInfo(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

}
