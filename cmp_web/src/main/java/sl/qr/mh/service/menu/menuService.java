package sl.qr.mh.service.menu;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class menuService {

    private final menuMapper menuMapper;

    public menuService(menuMapper menuMapper){
        this.menuMapper = menuMapper;
    }

    public Map<String ,Object> getMenuList(){
        Map<String,Object> returnMap = new HashMap<>();
        returnMap.put("errorCode", false);

        try{
            returnMap.put("menuList", menuMapper.getMenuList());
            returnMap.put("errorCode", true);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

}