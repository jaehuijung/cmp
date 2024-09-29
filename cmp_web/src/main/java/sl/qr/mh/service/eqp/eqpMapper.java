package sl.qr.mh.service.eqp;

import org.apache.ibatis.annotations.Mapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 장비관리 > 장비목록 메뉴에서 사용될 매퍼
 */
@Mapper
public interface eqpMapper {

	/**
	 * 장비관리 > 장비목록
	 * 장비 목록 데이터 가져오기
	 *
	 * @param paramMap 요청 파라미터 맵
	 * @return 장비 목록 데이터
	 */
	public List<Map<String, Object>> getEquipmentTotalList(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록
	 * 장비 목록 데이터 개수 가져오기
	 *
	 * @param paramMap 요청 파라미터 맵
	 * @return 장비 목록 데이터
	 */
	public int getEquipmentTotalListCnt(Map<String, Object> paramMap);




	/**
	 * 장비관리 > 장비목록 > 추가/수정/상세
	 * 장비분류 선택박스 : 구성분류 데이터 가져오기
	 *
	 * @return 구성분류 데이터
	 */
	public List<Map<String, Object>> getSelectConfigData();

	/**
	 * 장비관리 > 장비목록 > 추가/수정/상세
	 * 장비분류 자산분류 데이터 가져오기
	 *
	 * @return 자산분류 데이터
	 */
	public List<Map<String, Object>> getSelectAssetData(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 추가/수정/상세
	 * 장비분류 선택박스 : 자산세부 데이터 가져오기
	 *
	 * @return 자산세부 데이터
	 */
	public List<Map<String, Object>> getSelectSubData(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 추가/수정/상세
	 * 장비분류 선택박스 : 자산상세 데이터 가져오기
	 *
	 * @return 자산상세 데이터
	 */
	public List<Map<String, Object>> getSelectDetailData(Map<String, Object> paramMap); // 장비 추가 페이지 > 선택박스 : 자산상세분류

	


	/**
	 * 장비관리 > 장비목록 > 추가
	 * 장비 저장시 필요한 일련번호인 장비관리번호 생성
	 *
	 * @param paramMap 저장할 장비 데이터
	 * @return 장비관리번호
	 */
	public String generateEqpManageId(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 추가
	 * 장비 저장 : 기본정보
	 *
	 * @param paramMap 저장할 장비 데이터
	 */
	public void insertEquipmentBasic(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 추가
	 * 장비 저장 : 세부정보
	 *
	 * @param paramMap 저장할 장비 데이터
	 */
	public void insertEquipmentDetail(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 추가
	 * 장비 저장 : 연결정보
	 *
	 * @param paramMap 저장할 장비 데이터
	 */
	public void insertEquipmentPort(Map<String, Object> paramMap);




	/**
	 * 장비관리 > 장비목록 > 수정/상세
	 * 선택한 장비 정보 리스트 (기본정보, 세부정보, 연결정보)
	 *
	 * @param eqp_manage_id 장비 관리번호
	 * @return 장비 정보 리스트
	 */
	public Map<String, Object> getEquipmentDetailTotalList(String eqp_manage_id); // 장비 상세 리스트
	public Map<String, Object> getEquipmentDetailAssetList(Map<String, Object> paramMap); // 장비 상세 리스트 : 장비 분류 카테고리


	/**
	 * 장비관리 > 장비목록 > 수정
	 * 선택한 장비 정보 리스트 수정 (기본정보, 세부정보, 연결정보)
	 * ... 기본정보, 세부정보, 연결정보 수정 쿼리 3개 만들어야 함
	 * @param paramMap 삭제할 장비의 장비관리번호
	 */
	public void updateBasicEqpList(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 수정
	 * 선택한 장비 정보 리스트 수정 (기본정보, 세부정보, 연결정보)
	 * ... 기본정보, 세부정보, 연결정보 수정 쿼리 3개 만들어야 함
	 * @param paramMap 삭제할 장비의 장비관리번호
	 */
	public void updateDetailEqpList(Map<String, Object> paramMap);



	/**
	 * 장비관리 > 장비목록 > 삭제
	 * 선택한 장비 정보 리스트 삭제 : 기본정보 is_deleted 컬럼 'Y'로 변경
	 *
	 * @param deleteEqpTarget 삭제할 장비의 장비관리번호
	 */
	public void deleteEqpList(String deleteEqpTarget);



}
