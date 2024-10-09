package sl.qr.mh.service.user;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface userMapper {
    /**
     * 전체 사용자 리스트
     */
    List<Map<String, Object>> getUserInfoList();
    /**
     * 특정 사용자 리스트
     */
    Map<String, Object> getSelectUserInfoList(String userName);

}
