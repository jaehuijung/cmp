package sl.qr.mh.service.network.portmap;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 메인 > 대시보드
 */
@Slf4j
@Service
public class dashboardManageService {

    private final sl.qr.mh.service.network.portmap.dashboardMapper dashboardMapper;

    public dashboardManageService(sl.qr.mh.service.network.portmap.dashboardMapper dashboardMapper) {
        this.dashboardMapper = dashboardMapper;
    }

}
