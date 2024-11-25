package sl.qr.mh.service.eqp.hw;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


/**
 * 장비관리 > H/W관리
 */
@Mapper
public interface hwMapper {

    /**
     * 조회 > 장비 목록 데이터
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터
     */
    List<Map<String, Object>> getEquipmentTotalList(Map<String, Object> paramMap);

    /**
     * 조회 > 장비 목록 데이터 개수
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터
     */
    int getEquipmentTotalListCnt(Map<String, Object> paramMap);

    /**
     * 추가/수정/상세 > 장비분류 선택박스 > 장비분류 데이터 : 구성분류
     *
     * @return 구성분류 데이터
     */
    List<Map<String, Object>> getSelectConfigData();

    /**
     * 추가/수정/상세 > 장비분류 선택박스 > 장비분류 데이터 : 자산분류
     *
     * @return 자산분류 데이터
     */
    List<Map<String, Object>> getSelectAssetData(Map<String, Object> paramMap);

    /**
     * 추가/수정/상세 > 장비분류 선택박스 > 장비분류 데이터 : 자산세부
     *
     * @return 자산세부 데이터
     */
    List<Map<String, Object>> getSelectSubData(Map<String, Object> paramMap);

    /**
     * 추가/수정/상세 > 장비분류 선택박스 > 장비분류 데이터 : 자산상세
     *
     * @return 자산상세 데이터
     */
    List<Map<String, Object>> getSelectDetailData(Map<String, Object> paramMap);

    /**
     * 추가/수정 > H/W 장비 목록 리스트
     *
     * @return H/W 장비 목록 리스트
     */
    List<Map<String, Object>> getEquipmentHardwareList(Map<String, Object> paramMap);

    /**
     * 추가/수정 > H/W 장비 목록 리스트 개수
     *
     * @return H/W 장비 목록 리스트 개수
     */
    int getEquipmentHardwareListCnt(Map<String, Object> paramMap);

    /**
     * 수정/상세 > 선택된 H/W 장비에 등록된 Ip Address 리스트
     *
     * @param paramMap 요청 파라미터 맵
     * @return 선택된 H/W 장비에 등록된 Ip Address 리스트
     */
    List<Map<String, Object>> getEquipmentDetailIpAddressList(Map<String, Object> paramMap);

    /**
     * 수정/상세 > 선택된 H/W 장비에 등록된 Ip Address 리스트 개수
     *
     * @param paramMap 요청 파라미터 맵
     * @return 선택된 H/W 장비에 등록된 Ip Address 리스트 개수
     */
    int getEquipmentDetailIpAddressListCnt(Map<String, Object> paramMap);

    /**
     * 수정/상세 > 선택된 H/W 장비에 등록된 H/W 장비 목록 리스트
     *
     * @param paramMap 요청 파라미터 맵
     * @return 선택된 H/W 장비에 등록된 H/W 장비 목록 리스트
     */
    List<Map<String, Object>> getEquipmentDetailHardwareList(Map<String, Object> paramMap);

    /**
     * 수정/상세 > 선택된 H/W 장비에 등록된 H/W 장비 목록 리스트 개수
     *
     * @param paramMap 요청 파라미터 맵
     * @return 선택된 H/W 장비에 등록된 H/W 장비 목록 리스트 개수
     */
    int getEquipmentDetailHardwareListCnt(Map<String, Object> paramMap);

    /**
     * 추가/수정 > S/W 장비 목록 리스트
     *
     * @return S/W 장비 목록 리스트
     */
    List<Map<String, Object>> getEquipmentSoftwareList(Map<String, Object> paramMap);

    /**
     * 추가/수정 > S/W 장비 목록 리스트 개수
     *
     * @return S/W 장비 목록 리스트 개수
     */
    int getEquipmentSoftwareListCnt(Map<String, Object> paramMap);

    /**
     * 수정/상세 > 선택된 H/W 장비에 등록된 S/W 장비 목록 리스트
     *
     * @param paramMap 요청 파라미터 맵
     * @return 선택된 H/W 장비에 등록된 S/W 장비 목록 리스트
     */
    List<Map<String, Object>> getEquipmentDetailSoftwareList(Map<String, Object> paramMap);

    /**
     * 수정/상세 > 선택된 H/W 장비에 등록된 S/W 장비 목록 리스트 개수
     *
     * @param paramMap 요청 파라미터 맵
     * @return 선택된 H/W 장비에 등록된 S/W 장비 목록 리스트 개수
     */
    int getEquipmentDetailSoftwareListCnt(Map<String, Object> paramMap);

    /**
     * 추가 > 장비 저장 : 장비관리번호 생성
     *
     * @param paramMap 저장할 장비 데이터
     * @return 장비관리번호
     */
    String generateEquipmentManageId(Map<String, Object> paramMap);

    /**
     * 추가 > 장비 저장 : 기본정보
     *
     * @param paramMap 저장할 장비 데이터
     */
    void insertEquipmentBasic(Map<String, Object> paramMap);

    /**
     * 추가 > 장비 저장 : 세부정보
     *
     * @param paramMap 저장할 장비 데이터
     */
    void insertEquipmentDetail(Map<String, Object> paramMap);

    /**
     * 추가/수정 > 장비 저장 : 장비 IP정보 추가
     *
     * @param paramMap 저장할 장비 데이터
     */
    void insertEquipmentIp(Map<String, Object> paramMap);

    /**
     * 수정 > 장비 저장 : 장비 IP정보 수정
     *
     * @param paramMap 저장할 장비 데이터
     */
    void updateEquipmentIp(Map<String, Object> paramMap);

    /**
     * 수정 > 장비 저장 : 장비 IP정보 삭제
     *
     * @param paramMap 저장할 장비 데이터
     */
    void deleteEquipmentIp(Map<String, Object> paramMap);

    /**
     * 추가/수정 > 장비 저장 : 장비연결정보 추가
     *
     * @param paramMap 저장할 장비 데이터
     */
    void insertEquipmentHardware(Map<String, Object> paramMap);

    /**
     * 수정 > 장비 저장 : 장비연결정보 수정
     *
     * @param paramMap 수정할 장비 데이터
     */
    void updateEquipmentHardware(Map<String, Object> paramMap);

    /**
     * 수정 > 장비 저장 : 장비연결정보 삭제
     *
     * @param paramMap 삭제할 장비 데이터
     */
    void deleteEquipmentHardware(Map<String, Object> paramMap);

    /**
     * 추가/수정 > 장비 저장 : 소프트웨어 정보 추가
     *
     * @param paramMap 저장할 장비 데이터
     */
    void insertEquipmentSoftware(Map<String, Object> paramMap);
    /**
     * 수정 > 장비 저장 : 소프트웨어 정보 삭제
     *
     * @param paramMap 삭제할 장비 데이터
     */
    void deleteEquipmentSoftware(Map<String, Object> paramMap);

    /**
     * 수정/상세 > 선택한 장비 정보 : 기본정보, 세부정보
     *
     * @param eqp_manage_id 장비 관리번호
     * @return 장비 정보 리스트
     */
    Map<String, Object> getEquipmentDetailTotalList(String eqp_manage_id); //

    /**
     * 수정/상세 > 선택한 장비 정보 : 장비 분류 (구성분류, 자산분류, 자산세부분류, 자산상세분류)
     *
     * @param paramMap 장비 관리번호
     * @return 장비 정보 리스트
     */
    Map<String, Object> getEquipmentDetailAssetList(Map<String, Object> paramMap);

    /**
     * 수정 > 선택한 장비 정보 : 기본정보
     *
     * @param paramMap 수정할 장비 데이터
     */
    void updateBasicEqpList(Map<String, Object> paramMap);

    /**
     * 수정 > 선택한 장비 정보 : 세부정보
     *
     * @param paramMap 수정할 장비 데이터
     */
    void updateDetailEqpList(Map<String, Object> paramMap);

    /**
     * 삭제 > 삭제하려는 장비가 선번장에 등록되어 있는지 검증
     * 선번장에 등록된 장비는 삭제되면 안됨
     *
     * @param deleteEqpTarget 장비관리번호
     */
    int checkLineIsContainEqpList(String deleteEqpTarget);

    /**
     * 삭제 > 선택한 장비 정보 삭제
     * 기본정보 is_deleted 컬럼 'Y'로 변경
     *
     * @param deleteEqpTarget 장비관리번호
     */
    void deleteEqpList(String deleteEqpTarget);

    /**
     * 조회 > 장비 목록 다운로드 > 장비목록 전체 리스트 : 기본정보, 상세정보
     *
     * @return 장비 목록 데이터
     */
    List<Map<String, Object>> getExcelEquipmentTotalList();

    /**
     * 조회 > 장비 목록 다운로드 > 장비목록 전체 리스트 : 연결정보
     *
     * @return 장비 목록 데이터
     */
    List<Map<String, Object>> getExcelEquipmentLinkList();


}
