package sl.qr.mh.service.main.dashboard;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


/**
 * 메인 > 대시보드
 */
@Mapper
public interface dashboardMapper {
    List<Map<String, Object>> getFiberCableData();
    List<Map<String, Object>> getUtpCableData();
    List<Map<String, Object>> getHardwareData();
    List<Map<String, Object>> getSoftwareData();
}
