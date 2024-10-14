package sl.qr.mh.service.user;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface userMapper {
    // 사용자 정보 리스트
    public List<Map<String, Object>> getUserList(Map<String, Object> paramMap);
    
    // 사용자 정보 리스트 개수
    public int getUserListCnt(Map<String, Object> paramMap);

    // 선택된 사용자 정보 리스트
    public Map<String, Object> getSelectUserList(Map<String, Object> paramMap);

    // 사용자 정보 저장
    public void saveUserInfo(Map<String, Object> paramMap);

    // 사용자 부서 리스트
    public List<Map<String, Object>> getUserDepartmentList();

    // 사용자 직책 리스트
    public List<Map<String, Object>> getUserPositionList();

    // 사용자 그룹 리스트
    public List<Map<String, Object>> getUserGroupList();

    // 사용자 정보 삭제
    public void deleteUserInfo(String idx);
    
}
