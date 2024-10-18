package sl.qr.mh.service.common;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface menuMapper {

    public List<Map<String, Object>> getMenuList();

}
