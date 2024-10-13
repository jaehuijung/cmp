package sl.qr.mh.service.cable;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface cableMapper {

	// 선번장관리 > 선번장목록 > 리스트 목록
	public List<Map<String, Object>> getCableTotalList(Map<String, Object> paramMap);

	// 선번장관리 > 선번장목록 > 리스트 개수
	public int getCableTotalListCnt(Map<String, Object> paramMap);

	// 선번장관리 > 선번장목록 > 추가 > 출발지, 목적지 리스트
	public List<Map<String, Object>> getRackEquipmentList(Map<String, Object> paramMap);

	// 선번장관리 > 선번장목록 > 추가 > 출발지, 목적지 리스트 개수
	public int getRackEquipmentListCnt(Map<String, Object> paramMap);

	// 선번장관리 > 선번장목록 > 추가 > 회선구분, 회선속도, 회선색상 리스트
	public List<Map<String, Object>> getRackLinkList(Map<String, Object> paramMap);

	// 선번장관리 > 선번장목록 > 추가 > 선번장 저장시 필요한 일련번호인 장비관리번호 생성
	public String generateCableManageId(Map<String, Object> paramMap);

	// 선번장관리 > 선번장목록 > 추가 > 선번장 정보 저장
	public void saveCableInfo(Map<String, Object> paramMap);

	// 선번장관리 > 선번장목록 > 수정/상세 > 선번장 상세 정보 (포설년도, 회선정보)
	public Map<String, Object> getCableDetailLinkList(String cableManageId);

	// 선번장관리 > 선번장목록 > 수정/상세 > 선택된 선번장 구성 데이터 (출발지, 목적지)
	public List<Map<String, Object>> getCableDetailTotalList(Map<String, Object> paramMap);
}
