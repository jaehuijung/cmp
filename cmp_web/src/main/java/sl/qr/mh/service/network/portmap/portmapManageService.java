package sl.qr.mh.service.network.portmap;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 네트워크 > 포트맵
 */
@Slf4j
@Service
public class portmapManageService {

    private final portmapMapper portmapMapper;

    public portmapManageService(portmapMapper portmapMapper) {
        this.portmapMapper = portmapMapper;
    }

}
