package sl.qr.mh.service.eqp;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface eqpMapper {

	/**
	 * 장비관리 > 장비목록 에서 사용될 매퍼
	 */
	
	
	public List<Map<String, Object>> getEqpTotalList(Map<String, Object> paramMap); // 장비목록 페이지 > 장비 리스트
	public int getEqpTotalListCnt(Map<String, Object> paramMap); // 장비 목록 페이지 > 리스트 개수


	public List<Map<String, Object>> getSelectConfigData(); 						    // 장비 추가 페이지 > 선택박스 : 구성분류
	public List<Map<String, Object>> getSelectAssetData(Map<String, Object> paramMap);  // 장비 추가 페이지 > 선택박스 : 자산분류
	public List<Map<String, Object>> getSelectSubData(Map<String, Object> paramMap);    // 장비 추가 페이지 > 선택박스 : 자산세부분류
	public List<Map<String, Object>> getSelectDetailData(Map<String, Object> paramMap); // 장비 추가 페이지 > 선택박스 : 자산상세분류

	public String generateEqpManageId(Map<String, Object> paramMap); // 장비 추가 페이지 > 장비 관리번호 생성
	public void insertEquipmentBasic(Map<String, Object> paramMap);  // 장비 추가 페이지 > 장비 기본정보 저장
	public void insertEquipmentDetail(Map<String, Object> paramMap); // 장비 추가 페이지 > 장비 세부정보 저장
	public void insertEquipmentPort(Map<String, Object> paramMap);   // 장비 추가 페이지 > 장비 연결정보 저장
	


	/* 테이블 쪼개면서 아래 쿼리 다시 작성해야 함... 나중에 지우기  */
	public Map<String, Object> getEqpDetailList(String param); // 장비 상세 리스트
	
	public void insertEqpList(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 추가
	public void updateEqpList(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 수정
	public void deleteEqpList(String deleteEqpTarget); // 장비관리 > 장비목록 > 삭제

}
