package sl.qr.mh.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sl.qr.mh.service.config.configMapper;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberDao memberDao;

    @Autowired
    private final configMapper configMapper;

    public  CustomUserDetailsService(configMapper userMapper){
        this.configMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        MemberDao member = configMapper.getSecurityUserInfoList(id);

        return member == null ? null : new CustomUser(member);
    }

}
