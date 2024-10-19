package sl.qr.mh.controller.main.notice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sl.qr.mh.service.main.notice.noticeManageService;

/**
 * 메인 > 공지사항
 */
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/main/notice")
public class noticeController {

    private final noticeManageService noticeManageService;

    public noticeController(noticeManageService noticeManageService){
        this.noticeManageService = noticeManageService;
    }

    /**
     * 메인 > 공지사항 > 조회 > 뷰 페이지
     *
     * @return 공지사항 뷰 페이지
     */
    @GetMapping("/view")
    public String view() {
        return "views/main/notice/view";
    }
}
