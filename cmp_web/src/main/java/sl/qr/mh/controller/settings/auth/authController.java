package sl.qr.mh.controller.settings.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sl.qr.mh.service.eqp.sw.swManageService;
import sl.qr.mh.service.settings.auth.authManageService;

/**
 * 환경설정 > 권한관리
 */
@Slf4j
@Controller
@RequestMapping("/settings/auth")
public class authController {


    private final authManageService authManageService;

    public authController(authManageService authManageService){
        this.authManageService = authManageService;
    }

    @GetMapping("/view")
    public String view(){

        return "/views/settings/auth/view";
    }

}
