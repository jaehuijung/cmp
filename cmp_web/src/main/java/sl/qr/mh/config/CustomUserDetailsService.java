package sl.qr.mh.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sl.qr.mh.service.config.configMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

    // @Autowired
    // private final MemberDao memberDao;

    @Autowired
    private final configMapper configMapper;

    public  CustomUserDetailsService(configMapper userMapper){
        this.configMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        MemberDao member = configMapper.getSecurityUserInfoList(id);

        Integer groupIdx = member.getGroupIdx();
        if(groupIdx != null){
            member.setAuthList(getAuthList(groupIdx));
        }
        return member == null ? null : new CustomUser(member);
    }

    public List<String> getAuthList(int groupIdx) {
        List<String> getUserAuthList  = new ArrayList<>();

        Map<String, Object> authMap = new HashMap<>();
        authMap.put("groupIdx", groupIdx);
        authMap.put("menu_order", 2);

        List<Map<String, Object>> authList = configMapper.getSecurityUserAuthList(authMap);

        for(Map<String, Object> auth : authList){
            String create = auth.get("create").toString();
            String read = auth.get("read").toString();
            String update = auth.get("update").toString();
            String delete = auth.get("delete").toString();
            String menuAuth = auth.get("menu_auth").toString();

            getUserAuthList.addAll(setMenuAuth(create, read, update, delete, menuAuth));
        }

        return getUserAuthList;
    }

    public List<String> setMenuAuth(String c, String r, String u, String d, String auth) {
        List<String> authList = new ArrayList<>();

        if("Y".equals(c)){
            authList.add("ROLE_"+auth+"_C");
        }
        if("Y".equals(r)){
            authList.add("ROLE_"+auth+"_R");
        }
        if("Y".equals(u)){
            authList.add("ROLE_"+auth+"_U");
        }
        if("Y".equals(d)){
            authList.add("ROLE_"+auth+"_D");
        }

        return authList;
    }

}
