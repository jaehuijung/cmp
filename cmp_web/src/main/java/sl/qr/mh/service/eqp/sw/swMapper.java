package sl.qr.mh.service.eqp.sw;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


/**
 * S/W관리 > S/W목록
 */
@Mapper
public interface swMapper {

    /**
     * S/W관리 > 장비목록 > 장비 목록 데이터
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터
     */
    List<Map<String, Object>> getEquipmentTotalList(Map<String, Object> paramMap);

    /**
     * S/W관리 > 장비목록 > 장비 목록 데이터 개수
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터
     */
    int getEquipmentTotalListCnt(Map<String, Object> paramMap);


    /**
     * S/W관리 > 장비목록 > 추가 > 장비 저장 : 장비관리번호 생성
     *
     * @param paramMap 저장할 장비 데이터
     * @return 장비관리번호
     */
    String generateEquipmentManageId(Map<String, Object> paramMap);

    /**
     * S/W관리 > 장비목록 > 추가 > 장비 저장 : 기본정보
     *
     * @param paramMap 저장할 장비 데이터
     */
    void insertEquipmentBasic(Map<String, Object> paramMap);

    /**
     * S/W관리 > 장비목록 > 추가 > 장비 저장 : 세부정보
     *
     * @param paramMap 저장할 장비 데이터
     */
    void insertEquipmentDetail(Map<String, Object> paramMap);
}
