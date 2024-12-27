package sl.qr.mh.zold.service.settings.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 환경설정 > 권한관리
 */
@Slf4j
@Service
public class authManageService {


    private final authMapper authMapper;

    public authManageService(authMapper authMapper) {
        this.authMapper = authMapper;
    }

}
