package sl.qr.mh.security;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface configMapper {

    /**
     * 시큐리티 : 로그인 한 사용자 정보
     */
    MemberDao getSecurityUserInfoList(String id);

    List<Map<String, Object>> getSecurityUserAuthList(Map<String, Object> paramMap);
}
