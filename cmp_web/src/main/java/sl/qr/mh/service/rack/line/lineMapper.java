package sl.qr.mh.service.rack.line;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
interface lineMapper {

    // 선번장관리 > 선번장목록 > 리스트 목록
    List<Map<String, Object>> getLineTotalList(Map<String, Object> paramMap);

    // 선번장관리 > 선번장목록 > 리스트 개수
    int getLineTotalListCnt(Map<String, Object> paramMap);

    // 선번장관리 > 선번장목록 > 추가 > 출발지, 목적지 리스트
    List<Map<String, Object>> getLineEquipmentList(Map<String, Object> paramMap);

    // 선번장관리 > 선번장목록 > 추가 > 출발지, 목적지 리스트 개수
    int getLineEquipmentListCnt(Map<String, Object> paramMap);

    // 선번장관리 > 선번장목록 > 추가 > 회선구분, 회선속도, 회선색상 리스트
    List<Map<String, Object>> getLineLinkList(Map<String, Object> paramMap);

    // 선번장관리 > 선번장목록 > 추가 > 저장하려는 선번장 목록이 이미 존재하는 지 검증
    int checkInsertListToContainLine(Map<String, Object> paramMap);

    // 선번장관리 > 선번장목록 > 추가 > 선번장 저장시 필요한 일련번호인 장비관리번호 생성
    String generateLineManageId(Map<String, Object> paramMap);

    // 선번장관리 > 선번장목록 > 추가 > 선번장 정보 저장
    void saveLineInfo(Map<String, Object> paramMap);

    // 선번장관리 > 선번장목록 > 수정/상세 > 선번장 상세 정보 (포설년도, 회선정보)
    Map<String, Object> getLineDetailLinkList(String cableManageId);

    // 선번장관리 > 선번장목록 > 수정/상세 > 선택박스 : 회선구분
    List<Map<String, Object>> getSelectLinkCategory();

    // 선번장관리 > 선번장목록 > 수정/상세 > 선택박스 : 회선속도
    List<Map<String, Object>> getSelectLinkSpeed();

    // 선번장관리 > 선번장목록 > 수정/상세 > 선택박스 : 회선색상
    List<Map<String, Object>> getSelectLinkColor();

    // 선번장관리 > 선번장목록 > 수정/상세 > 선택된 선번장 구성 데이터 (출발지, 목적지)
    List<Map<String, Object>> getLineDetailTotalList(Map<String, Object> paramMap);

    /**
     * 선번장관리 > 선번장목록 > 삭제 > 선택한 선번장 정보 리스트 삭제
     * 기본정보 is_deleted 컬럼 'Y'로 변경
     *
     * @param deleteCableTarget 장비관리번호
     */
    void deleteLineList(String deleteCableTarget);
}
