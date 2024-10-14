package sl.qr.mh.controller.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import sl.qr.mh.config.CustomUser;

import java.util.Map;

@ControllerAdvice
public class GlobalControllerAdvice {

    @ModelAttribute
    public void setAttribute(Model model, Authentication authentication) {

        if(authentication == null) {
            model.addAttribute("accountData", null);
        } else {
            CustomUser customUser = (CustomUser) authentication.getPrincipal();
            model.addAttribute("accountData", customUser.getMember());
        }
    }
}
