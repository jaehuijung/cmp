package sl.qr.mh.service.config;

import org.apache.ibatis.annotations.Mapper;
import sl.qr.mh.config.MemberDao;

@Mapper
public interface configMapper {

    /**
     * 시큐리티 : 로그인 한 사용자 정보
     */
    MemberDao getSecurityUserInfoList(String id);
}
