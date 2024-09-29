package sl.qr.mh.controller.auth;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("/settings/auth")
public class authController {

    public authController(){

    }

    @GetMapping("/view")
    public String view(){

        return "/views/auth/view";
    }

}
