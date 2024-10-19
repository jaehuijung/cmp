package sl.qr.mh.service.main.dashboard;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 메인 > 대시보드
 */
@Slf4j
@Service
public class dashboardManageService {

    private final dashboardMapper dashboardMapper;

    public dashboardManageService(dashboardMapper dashboardMapper) {
        this.dashboardMapper = dashboardMapper;
    }

}
