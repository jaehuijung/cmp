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
	 * 장비관리 > 장비목록 > 장비 목록 데이터 가져오기
	 *
	 * @param paramMap 요청 파라미터 맵
	 * @return 장비 목록 데이터
	 */
	public List<Map<String, Object>> getEquipmentTotalList(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 장비 목록 데이터 개수 가져오기
	 *
	 * @param paramMap 요청 파라미터 맵
	 * @return 장비 목록 데이터
	 */
	public int getEquipmentTotalListCnt(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 엑셀 다운로드 데이터 가져오기 : 기본정보, 상세정보
	 *
	 * @return 장비 목록 데이터
	 */
	public List<Map<String, Object>> getExcelEquipmentTotalList();
	/**
	 * 장비관리 > 장비목록 > 엑셀 다운로드 데이터 가져오기 : 연결정보
	 *
	 * @return 장비 목록 데이터
	 */
	public List<Map<String, Object>> getExcelEquipmentLinkList();

	/**
	 * 장비관리 > 장비목록 > 추가/수정/상세 > 장비분류 선택박스 : 구성분류 데이터 가져오기
	 *
	 * @return 구성분류 데이터
	 */
	public List<Map<String, Object>> getSelectConfigData();
	/**
	 * 장비관리 > 장비목록 > 추가/수정/상세 > 장비분류 자산분류 데이터 가져오기
	 *
	 * @return 자산분류 데이터
	 */
	public List<Map<String, Object>> getSelectAssetData(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 추가/수정/상세 > 장비분류 선택박스 : 자산세부 데이터 가져오기
	 *
	 * @return 자산세부 데이터
	 */
	public List<Map<String, Object>> getSelectSubData(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 추가/수정/상세 > 장비분류 선택박스 : 자산상세 데이터 가져오기
	 *
	 * @return 자산상세 데이터
	 */
	public List<Map<String, Object>> getSelectDetailData(Map<String, Object> paramMap); // 장비 추가 페이지 > 선택박스 : 자산상세분류

	/**
	 * 장비관리 > 장비목록 > 추가 > 장비 저장시 필요한 일련번호인 장비관리번호 생성
	 *
	 * @param paramMap 저장할 장비 데이터
	 * @return 장비관리번호
	 */
	public String generateEqpManageId(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 추가 > 장비 저장 : 기본정보
	 *
	 * @param paramMap 저장할 장비 데이터
	 */
	public void insertEquipmentBasic(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 추가 > 장비 저장 : 세부정보
	 *
	 * @param paramMap 저장할 장비 데이터
	 */
	public void insertEquipmentDetail(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 추가/수정 > 장비 저장 : 연결정보
	 *
	 * @param paramMap 저장할 장비 데이터
	 */
	public void insertEquipmentLink(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 추가/수정 > 장비 수정 : 연결정보
	 *
	 * @param paramMap 수정할 장비 데이터
	 */
	public void updateEquipmentLink(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 추가/수정 > 장비 삭제 : 연결정보
	 *
	 * @param paramMap 삭제할 장비 데이터
	 */
	public void deleteEquipmentLink(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 수정/상세 > 선택한 장비 정보 리스트 (기본정보, 세부정보, 연결정보)
	 * 장비 상세 리스트 : 기본정보, 상세정보
	 *
	 * @param eqp_manage_id 장비 관리번호
	 * @return 장비 정보 리스트
	 */
	public Map<String, Object> getEquipmentDetailTotalList(String eqp_manage_id); //
	/**
	 * 장비관리 > 장비목록 > 수정/상세 > 선택한 장비 정보 리스트 (기본정보, 세부정보, 연결정보)
	 * 장비 상세 리스트 : 선택한 장비 분류 카테고리(구성분류, 자산분류, 자산세부분류, 자산상세분류)
	 *
	 * @param paramMap 장비 관리번호
	 * @return 장비 정보 리스트
	 */
	public Map<String, Object> getEquipmentDetailAssetList(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 수정/상세 > 선택한 장비 정보 리스트 (기본정보, 세부정보, 연결정보)
	 * 장비 상세 리스트 : 장비 연결정보 리스트
	 *
	 * @param paramMap 장비 관리번호
	 * @return 장비 정보 리스트
	 */
	public List<Map<String, Object>> getEquipmentDetailLinkList(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 수정/상세 > 선택한 장비 정보 리스트 (기본정보, 세부정보, 연결정보)
	 * 장비 상세 리스트 : 장비 연결정보 리스트 개수
	 *
	 * @param paramMap 장비 관리번호
	 * @return 장비 정보 리스트
	 */
	public int getEquipmentDetailLinkListCnt(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 수정 > 선택한 장비 정보 리스트 수정 : 기본정보
	 *
	 * @param paramMap 삭제할 장비의 장비관리번호
	 */
	public void updateBasicEqpList(Map<String, Object> paramMap);
	/**
	 * 장비관리 > 장비목록 > 수정 > 선택한 장비 정보 리스트 수정 : 세부정보
	 *
	 * @param paramMap 삭제할 장비의 장비관리번호
	 */
	public void updateDetailEqpList(Map<String, Object> paramMap);

	/**
	 * 장비관리 > 장비목록 > 삭제 > 선택한 장비 정보 리스트 삭제
	 * 삭제하기 전 선번장 목록에 포함되어 있는지 확인 ... 존재하면 장비는 삭제되면 안됨
	 *
	 * @param deleteEqpTarget 장비관리번호
	 */
	public int checkCableIsContainEqpList(String deleteEqpTarget);

	/**
	 * 장비관리 > 장비목록 > 삭제 > 선택한 장비 정보 리스트 삭제
	 * 기본정보 is_deleted 컬럼 'Y'로 변경
	 *
	 * @param deleteEqpTarget 장비관리번호
	 */
	public void deleteEqpList(String deleteEqpTarget);

}
