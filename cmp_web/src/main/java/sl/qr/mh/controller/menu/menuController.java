package sl.qr.mh.controller.menu;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sl.qr.mh.service.menu.menuService;

import java.util.Map;

@Slf4j
@RequestMapping("/common")
@RestController
public class menuController {

    private final menuService menuService;

    public menuController(menuService menuService){
        this.menuService = menuService;
    }

    /**
     * 상단 메뉴와 왼쪽 사이드 메뉴 그릴때 필요한 리스트
     *
     * @return 메뉴 리스트
     */
    @GetMapping("/menuList")
    public Map<String, Object> getMenuList(){
        return menuService.getMenuList();
    }

}
