package sl.qr.mh.config;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.stream.Collectors;

@Getter
public class CustomUser extends User {
    private MemberDao member;

    public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities){
        super(username, password, authorities);
    }

    public CustomUser(MemberDao member){
        super(member.getId(),
                member.getPassword(),
                member.getAuthList().stream()
                        .map(auth -> new SimpleGrantedAuthority(auth))
                        .collect(Collectors.toList()));

        this.member = member;
    }

}
