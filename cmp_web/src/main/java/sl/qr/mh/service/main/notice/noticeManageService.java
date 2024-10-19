package sl.qr.mh.service.main.notice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 메인 > 공지사항
 */
@Slf4j
@Service
public class noticeManageService {


    private final noticeMapper noticeMapper;

    public noticeManageService(noticeMapper noticeMapper) {
        this.noticeMapper = noticeMapper;
    }

}
