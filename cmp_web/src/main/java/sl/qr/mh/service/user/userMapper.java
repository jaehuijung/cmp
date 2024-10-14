package sl.qr.mh.service.user;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface userMapper {
    public List<Map<String, Object>> getAllUserList(Map<String, Object> paramMap);
    public int getAllUserListCnt(Map<String, Object> paramMap);
}
