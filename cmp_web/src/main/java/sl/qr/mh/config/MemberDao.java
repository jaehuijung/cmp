package sl.qr.mh.config;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@RequiredArgsConstructor
public class MemberDao {

    private String id;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String position;
    private Integer group_idx;

    private List<Auth> authList;
    private List<Map<String, Object>> menuList;
}
