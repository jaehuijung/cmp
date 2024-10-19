package sl.qr.mh.service.main.statistics;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 메인 > 보고/통계
 */
@Slf4j
@Service
public class statisticsManageService {


    private final statisticsMapper statisticsMapper;

    public statisticsManageService(statisticsMapper statisticsMapper) {
        this.statisticsMapper = statisticsMapper;
    }

}
