package sl.qr.mh.service.common;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface commonMapper {

    // 회선구분 리스트
    public List<Map<String, Object>> getLineLinkCategory();

    // 회선구분 리스트
    public List<Map<String, Object>> getLineLinkCategoryCnt();

    // 회선속도, 회선색상 리스트
    public List<Map<String, Object>> getLineLinkSpeed();

    // 회선속도, 회선색상 리스트
    public List<Map<String, Object>> getLineLinkSpeedCnt();
}
