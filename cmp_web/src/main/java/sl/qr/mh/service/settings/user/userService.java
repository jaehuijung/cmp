package sl.qr.mh.service.settings.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class userService {

    private final PasswordEncoder passwordEncoder;
    private final userMapper userMapper;

    public userService(PasswordEncoder passwordEncoder, userMapper userMapper) {
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    // 사용자 정보 리스트
    public Map<String, Object> getAllUserList(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            List<Map<String, Object>> rows = userMapper.getUserList(paramMap);
            int total = userMapper.getUserListCnt(paramMap);

            returnMap.put("rows", rows);
            returnMap.put("total", total);
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    // 사용자 정보 등록
    @Transactional
    public Map<String, Object> saveUserInfo(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            int isContain = userMapper.checkExistUser(paramMap);
            if (isContain == 0) {
                // 비밀번호 인코딩
                String rawPassword = (String) paramMap.get("password");
                String encodedPassword = passwordEncoder.encode(rawPassword);
                paramMap.put("password", encodedPassword);

                // 사용자 정보 저장
                userMapper.saveUserInfo(paramMap);
            }

            returnMap.put("isContain", isContain);
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    // 선택된 사용자 정보 리스트
    public Map<String, Object> detailUserInfo(Map<String, Object> paramMap){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            Map<String, Object> rows = userMapper.getSelectUserList(paramMap);
            returnMap.put("rows", rows);
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }


    // 사용자 정보 수정
    @Transactional
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
    @Transactional
    public Map<String, Object> deleteUserInfo(List<Map<String, Object>> deleteList){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            for(Map<String, Object> ele : deleteList){
                String idx = ele.get("idx").toString();
                userMapper.deleteUserInfo(idx);
            }

            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }


    // 선택박스에서 사용할 사용자 부서, 직책, 그룹 리스트
    public Map<String, Object> getUserSelectList(){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            List<Map<String, Object>> userGroupList = userMapper.getUserGroupList();
            List<Map<String, Object>> userPositionList = userMapper.getUserPositionList();
            List<Map<String, Object>> userDepartmentList = userMapper.getUserDepartmentList();

            returnMap.put("userGroupList", userGroupList);
            returnMap.put("userPositionList", userPositionList);
            returnMap.put("userDepartmentList", userDepartmentList);
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

}
