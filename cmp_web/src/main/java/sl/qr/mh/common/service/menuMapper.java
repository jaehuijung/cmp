package sl.qr.mh.common.service;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface menuMapper {

    public List<Map<String, Object>> getMenuList();

}
